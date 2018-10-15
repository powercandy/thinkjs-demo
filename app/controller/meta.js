function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 获取分类列表，获取分类信息，添加分类信息，更新分类信息
 */

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return _asyncToGenerator(function* () {})();
  }
  listAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const meta = _this.model('meta');
      // 获取meta表中所有的数据
      const metaInfo = yield meta.select();
      return _this.success({
        msg: '获取标签列表成功',
        metaInfo: metaInfo
      });
    })();
  }
  contentAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const meta = _this2.model('meta');
      const id = _this2.post('id');
      if (think.isEmpty(id) || !id) {
        return _this2.fail('请传入对应的参数id');
      }
      //获取meta表中对应id的数据
      const metaInfo = yield meta.where({ id: id }).find();
      if (think.isEmpty(metaInfo)) {
        return _this2.fail('查询内容失败');
      }
      return _this2.success({
        msg: '获取内容成功',
        metaInfo: metaInfo
      });
    })();
  }
  addAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const meta = _this3.model('meta');
      let metaInfo = _this3.post();
      if (think.isEmpty(metaInfo) || !metaInfo) {
        return _this3.fail('请检查参数是否正确');
      }
      metaInfo = Object.assign(metaInfo, { user_id: 1 });
      const result = yield meta.add(metaInfo);
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
      const meta = _this4.model('meta');
      const metaInfo = _this4.post();
      if (think.isEmpty(metaInfo) || !metaInfo) {
        return _this4.fail('请检查参数是否正确');
      }
      const result = yield meta.update(metaInfo);
      if (think.isEmpty(result)) {
        return _this4.fail('更新失败');
      }
      return _this4.success({ msg: '更新成功' });
    })();
  }
  deleteAction() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const meta = _this5.model('meta');
      const id = _this5.post('id');
      if (think.isEmpty(id) || !id) {
        return _this5.fail('请检查参数是否正确');
      }
      const findResult = yield meta.where({ id: id }).find();
      if (think.isEmpty(findResult)) {
        return _this5.fail('此数据已被删除，请刷新列表');
      }
      const result = yield meta.where({ id: id }).delete();
      if (think.isEmpty(result)) {
        return _this5.fail('删除失败');
      }
      return _this5.success({ msg: '删除成功' });
    })();
  }
};
//# sourceMappingURL=meta.js.map