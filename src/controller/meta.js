/**
 * 获取分类列表，获取分类信息，添加分类信息，更新分类信息
 */

const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
  }
  async listAction() {
    const meta = this.model('meta')
    // 获取meta表中所有的数据
    const metaInfo = await meta.select()
    return this.success({
      msg: '获取分类列表成功',
      metaInfo: metaInfo
    })
  }
  async contentAction() {
    const meta = this.model('meta')
    const id = this.post('id')
    if (think.isEmpty(id) || !id) {
      return this.fail('请传入对应的参数id')
    }
    //获取meta表中对应id的数据
    const metaInfo = await meta.where({id: id}).find()
    if (think.isEmpty(metaInfo)) {
      return this.fail('查询内容失败')
    }
    return this.success({
      msg: '获取内容成功',
      metaInfo: metaInfo
    })
  }
  async addAction() {
    const meta = this.model('meta')
    let metaInfo = this.post()
    if (think.isEmpty(metaInfo) || !metaInfo) {
      return this.fail('请检查参数是否正确')
    }
    metaInfo = Object.assign(metaInfo, {user_id: 1})
    const result = await meta.add(metaInfo)
    if (think.isEmpty(result)) {
      return this.fail('增加数据失败')
    }
    return this.success({
      msg: '添加数据成功'
    })

  }
  async updateAction() {
    const meta = this.model('meta')
    const metaInfo = this.post()
    if (think.isEmpty(metaInfo) || !metaInfo) {
      return this.fail('请检查参数是否正确')
    }
    const result = await meta.update(metaInfo)
    if (think.isEmpty(result)) {
      return this.fail('更新失败')
    }
    return this.success({msg: '更新成功'})
  }
  async deleteAction() {
    const meta = this.model('meta')
    const id = this.post('id')
    if (think.isEmpty(id) || !id) {
      return this.fail('请检查参数是否正确')
    }
    const findResult = await meta.where({id: id}).find()
    if (think.isEmpty(findResult)) {
      return this.fail('此数据已被删除，请刷新列表')
    }
    const result = await meta.where({id: id}).delete()
    if (think.isEmpty(result)) {
      return this.fail('删除失败')
    }
    return this.success({msg: '删除成功'})
  }
};
