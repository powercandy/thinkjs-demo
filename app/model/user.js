module.exports = class extends think.Model {
  /**
   * 密码校验
   * @param {*} userInfo 用户信息
   * @param {*} password 明文密码
   */
  verifyPassword(userInfo = {}, password = '') {
    // console.log(think.md5(think.md5(password) + userInfo.encrypt))
    return think.md5(think.md5(password) + userInfo.encrypt) === userInfo.password;
  }
  /**
   * 生成密码
   * @param {*} userInfo 用户信息
   * @param {*} password 明文密码
   */
  signPassword(userInfo = {}, password = '') {
    return think.md5(think.md5(password) + userInfo.encrypt);
  }
  formatDate(fmt = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
    let o = {
      "M+": date.getMonth() + 1, //月份   
      "d+": date.getDate(), //日   
      "h+": date.getHours(), //小时   
      "m+": date.getMinutes(), //分   
      "s+": date.getSeconds(), //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
  }
};
//# sourceMappingURL=user.js.map