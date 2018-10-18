function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const content = _this.model('content');
      const id = _this.post('id');
      if (think.isEmpty(id) || !id) {
        return _this.fail('请传入对应的参数id');
      }
      //获取content表中对应id的数据
      let contentInfo = yield content.where({ id: id }).find();
      if (think.isEmpty(contentInfo)) {
        return _this.fail('查询内容失败');
      }
      if (!Number(contentInfo.status)) {
        return _this.fail('该文章正在编辑，请耐心等候作者编辑！');
      }
      contentInfo.view++;
      content.update(contentInfo);
      return _this.success({
        msg: '获取内容成功',
        contentInfo: contentInfo
      });
    })();
  }
};
//# sourceMappingURL=view.js.map