module.exports = class extends think.Model {
  /**
   * 密码校验
   * @param {*} userInfo 用户信息
   * @param {*} password 明文密码
   */
  verifyPassword(userInfo={}, password='') {
    // console.log(think.md5(think.md5(password) + userInfo.encrypt))
    return think.md5(think.md5(password) + userInfo.encrypt) === userInfo.password
  }
  /**
   * 生成密码
   * @param {*} userInfo 用户信息
   * @param {*} password 明文密码
   */
  signPassword(userInfo={}, password='') {
    return think.md5(think.md5(password) + userInfo.encrypt)
  }
};
