const Connector = require('./lib/connector')

let sended = new Set()
let autosend = `首先感谢您的赏识[愉快]
给您发送一份我的简历[愉快]
-------------------------
该消息为自动回复[愉快]
该项目使用Nodejs开发，使用Docker部署[愉快]
目前正在寻找工作, 找到工作后该项目会下线[愉快]
对该项目感兴趣可以访问我的Github[愉快]
地址：http://github.com/bestnathan[愉快]`

let username = 'fGbqyfHgkt74uQR|0'
let password = 'HP2MCP3QmhcmWZcs'
let uid = 36857340

let c = new Connector({ username, password, uid })

c.on('error', err => {
  console.log('[error]', err.message)
})

c.on('connect', () => {
  console.log('[connector]', 'connect success')
})

c.on('textmsg', ({ from, name, message }) => {
  console.log(`[message] name: ${name}, message: ${message}`)
  if (!sended.has(from)) {
    c.sendGetBossInfo(from)
      .then(info => {
        console.log('[sendGetBossInfo]', info.resmsg)
        c.sendMessage({ text: autosend, name: info.data.encryptBossId })
        c.sendResume(from).then(data => {
          console.log('[sendResume]', data.resmsg)
          if (data.rescode) {
            sended.add(from)
          }
        })
      })
      .catch(e => {
        console.log('[error]', e.message)
      })
  }
})
