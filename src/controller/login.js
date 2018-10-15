const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    // 获取请求参数 - 用户名
    const username = this.post('username')
    // 获取请求参数 - 密码
    const password = this.post('password')
    const user = this.model('user')
    // 查询用户数据
    const userInfo = await user.where({username: username}).find()
    // 用户不存在 - 返回
    if (think.isEmpty(userInfo)) {
      return this.fail('用户不存在')
    }
    // 用户存在 - 比对密码 - 密码错误
    const result = user.verifyPassword(userInfo, password)
    if (think.isEmpty(result)) {
        return this.fail('密码错误')
    }
    // 删除密码和密码校验参数
    delete userInfo.password
    delete userInfo.encrypt
    // 更新登录时间
    user.where({ username: username }).update({last_login_time: (new Date()).getTime / 1000})
    // 存储token
    const token = await this.session('userInfo', userInfo)
    // 返回成功数据
    return this.success({
      msg: '登录成功',
      token: token
    })
  }
};
