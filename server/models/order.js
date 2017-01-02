module.exports = function (Order) {
  Order.methods.create = function * (ctx, next) {
    yield this.save()
  }
}
