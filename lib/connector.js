const ws = require('websocket').client
const axios = require('axios')
const eventEmitter = require('events').EventEmitter

const types = require('./type')
const { varIntDecode } = require('./util')
const { packetPublish, packetConnect, packetPublishAck, packetPing } = require('./protocol')
const { getChatProto } = require('./proto')

const debugConnector = require('debug')('connector')

const generateUniqeId = () => {
  return (
    Date.now() +
    Date.now()
      .toString()
      .slice(-6)
  )
}

class Connector extends eventEmitter {
  constructor({ username, password, uid }) {
    super()
    this.buffer = null
    this.username = username
    this.password = password
    this.uid = uid
    this.pingTimer = null
    this.pingerAckTimer = null
    this.messageIdentifier = 1
    this.Cookie = `t=${password}; wt=${password}`
    this.connected = false
    this._init()
  }
  _init() {
    this.socket = new ws()
    this.socket.connect(
      'wss://ws.zhipin.com/chatws',
      null,
      '',
      {
        Cookie: this.Cookie
      }
    )
    this.socket.on('connect', connection => {
      this.connection = connection
      this.connected = true

      this.connection.on('message', message => {
        this._onMessage(message.binaryData)
      })

      this.connection.on('error', err => {
        this.emit('error', err)
      })

      this.connection.on('close', (code, desc) => {
        this.emit('error', new Error(`websocket closed with code: ${code}, description: ${desc}`))
        this.connected = false
        clearInterval(this.pingTimer)
        clearTimeout(this.pingerAckTimer)
        this.reconnect()
      })

      this._sendConnectPacket()
    })

    this.socket.on('connectFailed', err => {
      this.emit('error', err)
    })
  }
  reconnect() {
    !this.connected && this._init()
  }
  _initPinger() {
    clearInterval(this.pingTimer)
    this.pingTimer = setInterval(() => {
      this._sendPing()
      clearTimeout(this.pingerAckTimer)
      this.pingerAckTimer = setTimeout(() => {
        this.emit('error', new Error(`ping timeout`))
      }, 10000)
    }, 40000)
  }
  _send(data) {
    this.connected && this.connection.sendBytes(Buffer.from(data))
  }
  _sendPublishChat(payload) {
    debugConnector('[send] publish')
    // if (this.messageIdentifier > 65535) {
    //   this.messageIdentifier = 1
    // }
    let buf = packetPublish({
      destination: 'chat',
      msgId: 1,
      qos: 1,
      retained: true,
      payload
    })
    this._send(buf)
  }
  _sendConnectPacket() {
    debugConnector('[send] connect')
    this._send(packetConnect(this.username, this.password))
  }
  _sendPublishAck(msgId) {
    debugConnector('[send] publish ack')
    this._send(packetPublishAck(msgId))
  }
  _sendPing() {
    debugConnector('[send] ping')
    this._send(packetPing())
  }
  _sendMessageRead({ uid, mid }) {
    debugConnector('[send] message read')
    let msgRead = getChatProto('TechwolfMessageRead', {
      userid: uid,
      messageid: mid,
      readtime: Date.now()
    })

    let chat = getChatProto('TechwolfChatProtocol', {
      type: 6
    })

    chat.setMessagereadList([msgRead])
    let protobuf = Buffer.from(chat.serializeBinary())
    this._sendPublishChat(protobuf)
  }
  async sendMessage({ uid = 0, name, text }) {
    let tmp = Date.now()
    let from = getChatProto('TechwolfUser', { uid: 0 })
    let to = getChatProto('TechwolfUser', { uid, name })
    let body = getChatProto('TechwolfMessageBody', { type: 1, text, templateid: 1 })
    let message = getChatProto('TechwolfMessage', { type: 1, from, to, body, mid: tmp, cmid: tmp })
    let chat = getChatProto('TechwolfChatProtocol', {
      type: 1
    })

    chat.setMessagesList([message])

    let protobuf = Buffer.from(chat.serializeBinary())
    this._sendPublishChat(protobuf)
  }
  sendResume(bossId) {
    return axios
      .get('https://www.zhipin.com/geek/new/requestSendResume.json', {
        params: {
          bossId
        },
        headers: {
          Cookie: this.Cookie
        }
      })
      .then(res => res.data)
  }
  sendGetBossInfo(bossId) {
    return axios
      .get('https://www.zhipin.com/geek/new/boss.json', {
        params: {
          bossId
        },
        headers: {
          Cookie: this.Cookie
        }
      })
      .then(res => res.data)
  }
  _sendPresence() {
    debugConnector('[send] presence')
    let clientinfo = getChatProto('TechwolfClientInfo', {
      version: '',
      system: '',
      systemversion: '',
      model: '',
      uniqid: generateUniqeId(),
      network: '',
      appid: 9019,
      platform: 'web',
      channel: '-1',
      ssid: '',
      bssid: '',
      longitude: 0,
      latitude: 0
    })

    let presence = getChatProto('TechwolfPresence', {
      type: 1,
      uid: this.uid,
      lastmessageid: 0,
      clientinfo
    })

    let chat = getChatProto('TechwolfChatProtocol', {
      type: 2,
      presence
    }).serializeBinary()

    let protobuf = Buffer.from(chat)
    this._sendPublishChat(protobuf)
  }
  _handlePublishAck(payload) {
    let msgId = payload.readUInt16BE()
    debugConnector(`[handle] publish ack, msgid: ${msgId}`)
  }
  _handleConnectAck(payload) {
    let sessionPresent = payload.readUInt8(0)
    let returnCode = payload.readUInt8(1)
    debugConnector(`[handle] connect ack, returnCode: ${returnCode}`)
    if (returnCode != 0) {
      // disconnect
      return
    }
    this._sendPresence()
    this._initPinger()
    this.emit('connect')
  }
  /**
   *
   * @param {Object} param
   * @param {Number} param.type
   * @param {Buffer} param.payload
   */
  _handlePublish({ type, payload }) {
    let offset = 0
    let qos = 3 & (type >> 1)
    let destinationNameLen = payload.readUInt16BE(offset)
    offset += 2

    let destinationName = payload.slice(offset, offset + destinationNameLen).toString()
    offset += destinationNameLen
    let messageIdentifier
    if (qos > 0) {
      messageIdentifier = payload.readUInt16BE(offset)
      offset += 2
    }

    let protobuffer = payload.slice(offset)
    let message = getChatProto('TechwolfChatProtocol')
      .deserializeBinary(new Uint8Array(protobuffer))
      .toObject()
    debugConnector(`[handle] publish, destination: ${destinationName}, qos: ${qos}, msgid: ${messageIdentifier}`)
    switch (qos) {
      case 0:
        this._handleMessageArrived(message)
        break
      case 1:
        this._sendPublishAck(messageIdentifier)
        this._handleMessageArrived(message)
        break
      case 2:
        break
      default:
        throw new Error('Invaild qos=' + qos)
    }
  }
  _handleMessageArrived(message) {
    debugConnector(`[message] arrive, type: ${message.type}`)
    switch (message.type) {
      case 1:
        this._handleRecieveMessage(message.messagesList)
        break
      case 5:
        this._handleSyncMessage(message.messagesyncList)
        break
      default:
        break
    }
  }
  _handleSyncMessage(messages) {
    messages.forEach(message => {
      debugConnector(`[message] sync, mid: ${message.clientmid}`)
    })
  }
  _handleRecieveMessage(messages) {
    messages.forEach(message => {
      this._handleMessage(message)
    })
  }
  _handleMessage(message) {
    // if (message.from.uid < 1001 || message.to.uid < 1e3) {
    //   return
    // }
    // let formatMsg = formatMessage(message, this.uid)
    // console.log(JSON.stringify(formatMsg))
    // 只处理文本消息
    debugConnector(`[message] recieve, type: ${message.type}`)
    if (message.type == 1 && message.body.type == 1) {
      let from = message.from.uid
      if (from == this.uid) {
        return
      }
      let mid = message.mid
      let name = message.from.name
      let msg = message.body.text
      //this._sendMessageRead({ uid: from, mid })
      this.emit('textmsg', {
        from,
        name,
        message: msg
      })
    }
  }
  /**
   * @param { Buffer } data
   */
  _onMessage(data) {
    if (this.buffer) {
      data = Buffer.concat([this.buffer, data])
    }

    let messages = this._decodeBuffer(data)
    messages.forEach(message => {
      switch (message.type >> 4) {
        case types.CONNACK:
          this._handleConnectAck(message.payload)
          break
        case types.PUBLISH:
          this._handlePublish(message)
          break
        case types.PUBACK:
          this._handlePublishAck(message.payload)
          break
        case types.PINGRESP:
          debugConnector(`[handler] ping`)
          clearTimeout(this.pingerAckTimer)
          break
        default:
          break
      }
    })
  }
  /**
   *
   * @param {Buffer} data
   * @returns { Object[] }
   */
  _decodeBuffer(data) {
    let len = data.length
    let lastMessageOffset = 0
    let offset = 0
    let messages = []
    do {
      let type = data.readUInt8(offset)
      offset += 1

      let result = varIntDecode(data, offset)
      offset = result.offset
      let payloadLen = result.result

      if (offset + payloadLen > data.length) {
        this.buffer = data.slice(lastMessageOffset)
        return messages
      }

      let payload = data.slice(offset, offset + payloadLen)
      messages.push({
        type,
        payload
      })

      offset += payloadLen
      lastMessageOffset = offset
    } while (offset < len)
    return messages
  }
}

module.exports = Connector
