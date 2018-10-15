function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
  __before() {
    // const isLogin = await this.session('token').catch(_ => ({}))
    // if (!isLogin) {
    //   return this.ctx.throw(401, '请先登录后再操作')
    // }

    return _asyncToGenerator(function* () {})();
  }
};
//# sourceMappingURL=base.js.map