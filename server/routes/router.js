const UserCtrl = require('../controllers/UserCtroller')
const router = require('koa-router')()

let userCtrl = new UserCtrl()
// let router = new Router()
router
  .get('/login', userCtrl.login)
  .get('/user', userCtrl.login)
module.exports = router
