function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return _asyncToGenerator(function* () {})();
  }
  listAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const content = _this.model('content');
      // 获取content表中所有的数据
      const contentInfo = yield content.select();
      return _this.success({
        msg: '获取内容列表成功',
        contentInfo: contentInfo
      });
    })();
  }
  contentAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const content = _this2.model('content');
      const id = _this2.post('id');
      if (think.isEmpty(id) || !id) {
        return _this2.fail('请传入对应的参数id');
      }
      //获取content表中对应id的数据
      const contentInfo = yield content.where({ id: id }).find();
      if (think.isEmpty(contentInfo)) {
        return _this2.fail('查询内容失败');
      }
      return _this2.success({
        msg: '获取内容成功',
        contentInfo: contentInfo
      });
    })();
  }
  addAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const content = _this3.model('content');
      let contentInfo = _this3.post();
      if (think.isEmpty(contentInfo) || !contentInfo) {
        return _this3.fail('请检查参数是否正确');
      }
      const result = yield content.add(contentInfo);
      if (think.isEmpty(result)) {
        return _this3.fail('增加数据失败');
      }
      return _this3.success({
        msg: '添加数据成功'
      });
    })();
  }
  updateAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const content = _this4.model('content');
      const contentInfo = _this4.post();
      if (think.isEmpty(contentInfo) || !contentInfo) {
        return _this4.fail('请检查参数是否正确');
      }
      const result = yield content.update(contentInfo);
      if (think.isEmpty(result)) {
        return _this4.fail('更新失败');
      }
      return _this4.success({ msg: '更新成功' });
    })();
  }
  deleteAction() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const content = _this5.model('content');
      const id = _this5.post('id');
      if (think.isEmpty(id) || !id) {
        return _this5.fail('请检查参数是否正确');
      }
      const findResult = yield content.where({ id: id }).find();
      if (think.isEmpty(findResult)) {
        return _this5.fail('此数据已被删除，请刷新列表');
      }
      const result = yield content.where({ id: id }).delete();
      if (think.isEmpty(result)) {
        return _this5.fail('删除失败');
      }
      return _this5.success({ msg: '删除成功' });
    })();
  }
};
//# sourceMappingURL=content.js.map