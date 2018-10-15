function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // 获取请求参数 - 用户名
      const account = _this.post('account');
      // 获取请求参数 - 密码
      const password = _this.post('password');
      // 查询用户数据
      const userList = yield _this.model('users').where({ account: account }).find();
      // 用户已存在 - 返回
      if (!think.isEmpty(userList)) {
        return _this.fail('用户已存在');
      }
      // 用户不存在 - 新建用户
      const insertId = yield _this.model('users').add({
        account: account,
        password: password,
        name: ''
      });
      if (!insertId) {
        return _this.fail('注册失败');
      }
      // 用户存在 - 比对密码 - 密码正确 - 登录成功
      return _this.success({
        msg: '注册成功'
      });
    })();
  }
};
//# sourceMappingURL=register.js.map