function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // 获取请求参数 - 用户名
      const username = _this.post('username');
      // 获取请求参数 - 密码
      const password = _this.post('password');
      const user = _this.model('user');
      // 查询用户数据
      const userInfo = yield user.where({ username: username }).find();
      // 用户不存在 - 返回
      if (think.isEmpty(userInfo)) {
        return _this.fail('用户不存在');
      }
      // 用户存在 - 比对密码 - 密码错误
      const result = user.verifyPassword(userInfo, password);
      if (think.isEmpty(result)) {
        return _this.fail('密码错误');
      }
      // 删除密码和密码校验参数
      delete userInfo.password;
      delete userInfo.encrypt;
      // 更新登录时间
      user.where({ username: username }).update({ last_login_time: new Date().getTime / 1000 });
      // 存储token
      const token = yield _this.session('userInfo', userInfo);
      // 返回成功数据
      return _this.success({
        msg: '登录成功',
        token: token
      });
    })();
  }
};
//# sourceMappingURL=login.js.map