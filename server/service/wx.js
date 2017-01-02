const request = require('superagent')
const wxconfig = require('../config').wx
let authorization_code_url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxconfig.appid}&secret=${wxconfig.secret}&js_code=JSCODE&grant_type=authorization_code`
module.exports.getSessionKey = function * (code) {
  authorization_code_url  = authorization_code_url.replace('JSCODE', code)
  return yield request.get(authorization_code_url)
}
