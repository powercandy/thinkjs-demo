const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const content = this.model('content')
    const id = this.post('id')
    if (think.isEmpty(id) || !id) {
      return this.fail('请传入对应的参数id')
    }
    //获取content表中对应id的数据
    let contentInfo = await content.where({id: id}).find()
    if (think.isEmpty(contentInfo)) {
      return this.fail('查询内容失败')
    }
    if (!Number(contentInfo.status)) {
      return this.fail('该文章正在编辑，请耐心等候作者编辑！')
    }
    contentInfo.view ++
    content.update(contentInfo)
    return this.success({
      msg: '获取内容成功',
      contentInfo: contentInfo
    })
  }
};
