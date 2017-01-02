const router = require('koa-route')
const compose = require('koa-compose')
const OrderCtrl = require('../controllers/OrderCtroller')
const co = require('co')
let routes = []
let orderCtrl = new OrderCtrl()
routes.push(router.all('/ws/orders', function *(next) {
  this.websocket.on('message', (order) => {
    let self = this
    this.request.body = JSON.parse(order)
    co(function *() {
      yield orderCtrl.create.call(self, next)
    }).catch((err) => {
      console.error(err);
    })
  })
}))
routes.push(router.all('/ws/lbs', function *(next) {
  this.websocket.on('message', (message) => {
    console.log(message, 2);
  })
  yield next
}))
module.exports = co.wrap(compose(routes))
