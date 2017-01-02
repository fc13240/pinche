const staticCache = require('koa-static-cache')
const WebSocket = require('koa-websocket')
const session = require('koa-session')
const convert = require('koa-convert')
const koa = require('koa')
const path = require('path')
const fs = require('fs')

const boot = require('./boot')
const wsrouter = require('./routes/wsrouter')
const router = require('./routes/router')

let port = 3000
let app = WebSocket(new koa())
let sessionStore = session(app)

boot(app)
app.use(router.routes())
app.ws.use(wsrouter)
app.use(convert(sessionStore))
app.ws.use(sessionStore)
app.use(convert(staticCache(path.join(__dirname, '../public'))))
app.use(convert(function * () {
  this.body = fs.createReadStream(path.join(__dirname, '../public/index.html'))
  this.type = 'html'
}))
app.listen(port, () => {
  console.log('server listening at port %d', port);
})
