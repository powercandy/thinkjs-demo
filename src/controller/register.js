const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    // 获取请求参数 - 用户名
    const account = this.post('account')
    // 获取请求参数 - 密码
    const password = this.post('password')
    // 查询用户数据
    const userList = await this.model('users').where({account: account}).find()
    // 用户已存在 - 返回
    if (!think.isEmpty(userList)) {
      return this.fail('用户已存在')
    }
    // 用户不存在 - 新建用户
    const insertId = await this.model('users').add({
      account: account,
      password: password,
      name: ''
    })
    if (!insertId) {
      return this.fail('注册失败')
    }
    // 用户存在 - 比对密码 - 密码正确 - 登录成功
    return this.success({
      msg: '注册成功'
    })
  }
};
