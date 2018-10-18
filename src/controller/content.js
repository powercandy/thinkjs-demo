const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
  }
  // 获取文章列表
  async listAction() {
    const content = this.model('content')
    // 获取content表中所有的数据
    const contentInfo = await content.select()
    return this.success({
      msg: '获取内容列表成功',
      contentInfo: contentInfo
    })
  }
  // 获取列表对应的文章内容
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
  // 新增文章
  async addAction() {
    const content = this.model('content')
    let contentInfo = this.post()
    if (think.isEmpty(contentInfo) || !contentInfo) {
      return this.fail('请检查参数是否正确')
    }
    // 添加创建时间和category_id参数
    contentInfo = Object.assign(contentInfo, {
      category_id: '1', 
      create_time: this.formatDate(),
      modify_time: this.formatDate(),
      user_id: '1',
      type: 'post'
    })
    const result = await content.add(contentInfo)
    if (think.isEmpty(result)) {
      return this.fail('增加数据失败')
    }
    return this.success({
      msg: '添加数据成功'
    })

  }
  // 更新文章
  async updateAction() {
    const content = this.model('content')
    let contentInfo = this.post()
    if (think.isEmpty(contentInfo) || !contentInfo) {
      return this.fail('请检查参数是否正确')
    }
    contentInfo = Object.assign(contentInfo, {
      modify_time: this.formatDate()
    })
    const result = await content.update(contentInfo)
    if (think.isEmpty(result)) {
      return this.fail('更新失败')
    }
    return this.success({msg: '更新成功'})
  }
  // 删除文章
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
  // 搜素文章
  async searchAction() {
    const content = this.model('content')
    const keys = this.post('keys')
    if (think.isEmpty(keys) || !keys) {
      return this.listAction()
    }
    let contentInfo = await content.where({title: ['like', `%${keys}%`]}).select()
    if (think.isEmpty(contentInfo)) {
      return this.fail('未搜索到相应文章')
    }
    return this.success({
      msg: '搜索成功',
      contentInfo: contentInfo
    })
  }
};
