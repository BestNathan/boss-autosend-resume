const Chat = require('./proto/chat_pb')

const parseKey = key => {
  let arr = key.split('_')
  return arr
    .map(v => {
      return v.charAt(0).toUpperCase() + v.slice(1)
    })
    .join('')
}

const generateProto = (ctor, params) => {
  let proto = new ctor()
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      let parsedKey = parseKey(key)
      let fn = proto['set' + parsedKey]
      if (fn) {
        fn.call(proto, params[key])
      }
    }
  }
  return proto
}

const getChatProto = (message, params) => {
  return params ? generateProto(Chat[message], params) : Chat[message]
}

module.exports = {
  getChatProto
}