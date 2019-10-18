const http = require('http');
const Koa = require('koa');


module.exports = async function ({ port, entry, name }) {
  const app = new Koa();

  // 创建数据库连接
  await require('@libs/serverInc/database')();

  // 创建 redis 连接
  await require('@libs/serverInc/redis')();

  // 引用入口文件
  app.use(require(entry));

  const httpServer = http.createServer(app.callback());

  httpServer.listen(port, () => {
    console.log('服务开始工作:', name, `prot@${port}`);
  });

  return httpServer;
};
