const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta', // 显示一些meta信息，如thinkjs版本号，接口的处理时间等
    options: {
      logRequest: isDev, // 是否打印请求
      sendResponseTime: isDev // 是否发送响应时间
    }
  },
  {
    handle: 'resource', //  处理静态资源
    enable: isDev, // 是否开启
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace', // 处理错误信息
    enable: !think.isCli, // 是否开启
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload', // 处理表单提交和文件上传
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router', // 路由解析
    options: {}
  },
  'logic', // logic调用，数据校验
  'controller' // controller 和 action 调用
];
