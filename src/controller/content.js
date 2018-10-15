const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
  }
  async listAction() {
    const content = this.model('content')
    // 获取content表中所有的数据
    const contentInfo = await content.select()
    return this.success({
      msg: '获取内容列表成功',
      contentInfo: contentInfo
    })
  }
  async contentAction() {
    const content = this.model('content')
    const id = this.post('id')
    if (think.isEmpty(id) || !id) {
      return this.fail('请传入对应的参数id')
    }
    //获取content表中对应id的数据
    const contentInfo = await content.where({id: id}).find()
    if (think.isEmpty(contentInfo)) {
      return this.fail('查询内容失败')
    }
    return this.success({
      msg: '获取内容成功',
      contentInfo: contentInfo
    })
  }
  async addAction() {
    const content = this.model('content')
    let contentInfo = this.post()
    if (think.isEmpty(contentInfo) || !contentInfo) {
      return this.fail('请检查参数是否正确')
    }
    const result = await content.add(contentInfo)
    if (think.isEmpty(result)) {
      return this.fail('增加数据失败')
    }
    return this.success({
      msg: '添加数据成功'
    })

  }
  async updateAction() {
    const content = this.model('content')
    const contentInfo = this.post()
    if (think.isEmpty(contentInfo) || !contentInfo) {
      return this.fail('请检查参数是否正确')
    }
    const result = await content.update(contentInfo)
    if (think.isEmpty(result)) {
      return this.fail('更新失败')
    }
    return this.success({msg: '更新成功'})
  }
  async deleteAction() {
    const content = this.model('content')
    const id = this.post('id')
    if (think.isEmpty(id) || !id) {
      return this.fail('请检查参数是否正确')
    }
    const findResult = await content.where({id: id}).find()
    if (think.isEmpty(findResult)) {
      return this.fail('此数据已被删除，请刷新列表')
    }
    const result = await content.where({id: id}).delete()
    if (think.isEmpty(result)) {
      return this.fail('删除失败')
    }
    return this.success({msg: '删除成功'})
  }
};
