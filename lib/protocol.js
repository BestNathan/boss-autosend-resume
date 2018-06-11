const types = require('./type')
const { getUuid, varIntEncode } = require('./util')

const packetString = str => {
  let len = str.length
  let strBuf = Buffer.from(str)
  let lenBuf = Buffer.alloc(2)
  lenBuf.writeUInt16BE(len, 0)
  return Buffer.concat([lenBuf, strBuf])
}

const packet = (type, payload) => {
  let len = payload.length
  let headBuffer = Buffer.from([type].concat(varIntEncode(len)))
  return Buffer.concat([headBuffer, payload])
}

const packetConnect = (username, password) => {
  if (!username || !password) {
    throw new Error('username and password are required!')
  }
  let type = (types.CONNECT & 15) << 4
  let clientId = 'ws-' + getUuid(16, 16)
  let constant = [0, 6, 77, 81, 73, 115, 100, 112, 3, 194, 0, 40]
  let constantBuffer = Buffer.from(constant)
  let clientIdBuffer = packetString(clientId)
  let usernameBuffer = packetString(username)
  let passwordBuffer = packetString(password)
  return packet(type, Buffer.concat([constantBuffer, clientIdBuffer, usernameBuffer, passwordBuffer]))
}

const packetPublish = ({ destination, msgId, qos, retained, payload }) => {
  let type = (types.PUBLISH & 15) << 4
  type |= qos << 1
  retained && (type |= 1)

  let destinationBuffer = packetString(destination)
  let msgIdBuffer = Buffer.alloc(2)
  msgIdBuffer.writeUInt16BE(msgId)
  return packet(type, Buffer.concat([destinationBuffer, msgIdBuffer, payload]))
}

const packetPublishAck = (msgId) => {
  let type = (types.PUBACK & 15) << 4
  let payload = Buffer.alloc(2)
  payload.writeUInt16BE(msgId)
  return packet(type, payload)
}

const packetPing = () => {
  let type = (types.PINGREQ & 15) << 4
  return packet(type, Buffer.alloc(0))
}

module.exports = {
  packetPing,
  packetPublish,
  packetPublishAck,
  packetConnect
}