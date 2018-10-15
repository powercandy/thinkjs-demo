module.exports = class extends think.Controller {
  async __before() {
    // const isLogin = await this.session('token').catch(_ => ({}))
    // if (!isLogin) {
    //   return this.ctx.throw(401, '请先登录后再操作')
    // }
  }
};
