function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 用户登录，更新密码，更新个人信息接口
 */

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return _asyncToGenerator(function* () {})();
  }
  /* 登录接口 */
  loginAction() {
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
      userInfo.last_login_time = user.formatDate();
      user.where({ username: username }).update(userInfo);
      // 返回成功数据
      return _this.success({
        msg: '登录成功',
        userInfo: userInfo
      });
    })();
  }
  /* 更新密码接口 */
  update_psdAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const data = _this2.post();
      if (think.isEmpty(data)) {
        return _this2.fail('数据不能为空');
      }
      if (data.newPsd !== data.confirmPsd) {
        return _this2.fail('两次密码输入不一致');
      }
      const user = _this2.model('user');
      let userInfo = yield user.where({ username: data.username }).find();
      if (!user.verifyPassword(userInfo, data.oldPsd)) {
        return _this2.fail('当前密码输入错误');
      }
      userInfo.password = user.signPassword(userInfo, data.newPsd);
      userInfo = Object.assign(userInfo, { update_time: user.formatDate() });
      const rows = yield user.where({ username: data.username }).update(userInfo);
      if (!rows) {
        return _this2.fail('更新失败');
      }
      return _this2.success('更新成功');
    })();
  }
  /* 更新个人信息接口 */
  update_mesAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const data = _this3.post();
      if (think.isEmpty(data)) {
        return _this3.fail('数据不能为空');
      }
      const user = _this3.model('user');
      let userInfo = yield user.where({ username: data.username }).find();
      if (think.isEmpty(userInfo)) {
        return _this3.fail('请勿随便更改用户信息');
      }
      data.update_time = user.formatDate();
      const rows = yield user.where({ username: data.username }).update(data);
      if (!rows) {
        return _this3.fail('更新失败');
      }
      return _this3.success({
        msg: '更新成功',
        userInfo: data
      });
    })();
  }
};
//# sourceMappingURL=user.js.map