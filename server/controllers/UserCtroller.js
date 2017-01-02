module.exports = class UserCtroller {
  * login (next) {
    // let code = ctx.query.code
    // let result = getSessionKey(code)
    console.log(ctx.session);
  }
}
