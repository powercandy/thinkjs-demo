/**
 * 用户登录，更新密码，更新个人信息接口
 */

const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
  }
  /* 登录接口 */
  async loginAction() {
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
    userInfo.last_login_time = this.formatDate()
    user.where({ username: username }).update(userInfo)
    // 返回成功数据
    return this.success({
      msg: '登录成功',
      userInfo: userInfo
    })
  }
  /* 更新密码接口 */
  async update_psdAction() {
    const data = this.post()
    if (think.isEmpty(data)) {
      return this.fail('数据不能为空')
    }
    if(data.newPsd !== data.confirmPsd) {
      return this.fail('两次密码输入不一致')
    }
    const user = this.model('user')
    let userInfo = await user.where({username: data.username}).find()
    if (!user.verifyPassword(userInfo, data.oldPsd)) {
      return this.fail('当前密码输入错误')
    }
    userInfo.password = user.signPassword(userInfo, data.newPsd)
    userInfo = Object.assign(userInfo, {update_time: this.formatDate()})
    const rows = await user.where({username: data.username}).update(userInfo)
    if (!rows) {
      return this.fail('更新失败')
    }
    return this.success('更新成功')
  }
  /* 更新个人信息接口 */
  async update_mesAction() {
    const data = this.post()
    if (think.isEmpty(data)) {
      return this.fail('数据不能为空')
    }
    const user = this.model('user')
    let userInfo = await user.where({username: data.username}).find()
    if (think.isEmpty(userInfo)) {
      return this.fail('请勿随便更改用户信息')
    }
    data.update_time = this.formatDate()
    const rows = await user.where({username: data.username}).update(data)
    if (!rows) {
      return this.fail('更新失败')
    }
    return this.success({
      msg: '更新成功',
      userInfo: data
    })
  }
};
