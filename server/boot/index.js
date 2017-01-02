const models = require('./mongo')
const convert = require('koa-convert')
function * proxyAction (next) {
  Object.keys(models).forEach((key) => {
    let modelName = models[key].modelName
    this[modelName] = models[key]
  })
  yield next
}
module.exports = function (app) {
  app.models = models
  app.use(convert(proxyAction))
  app.ws.use(proxyAction)
}
