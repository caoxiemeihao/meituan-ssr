const http = require('http');
const Koa = require('koa');
const { databases } = require('@/config');
const mysql = require('promise-mysql');
let __db = require('@/mods/__databases');

module.exports = async function ({ port, entry }) {
  const app = new Koa();

  __db = {};

  // 创建数据库连接
  Object.keys(databases).forEach(async (k) => {
    const db = await mysql.createPool(databases[k]);

    __db[k] = db;
  });

  app.use(require(entry));

  /*
  app.listen(port, () => {
    console.log('服务开始工作:', port);
  });
  */
  const httpServer = http.createServer(app.callback());

  httpServer.listen(port, () => {
    console.log('服务开始工作:', port);
  });

  return httpServer;
};
