module.exports = class OrderCtroller {
  * create (next) {
    let order = this.body || this.request.body
    console.log(order);
    // let order = ctx.body || ctx.request.body
    // order.createAt = new Date()
    // order.userId = ctx.accessUser._id
    // let model = new ctx.Order(order)
    // yield model.save()
  }
}
