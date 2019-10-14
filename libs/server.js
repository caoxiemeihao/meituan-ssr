const Koa = require('koa');
const { databases } = require('../config');
const mysql = require('promise-mysql');

module.exports = async function ({ port, entry }) {
  const app = new Koa();

  app.context.databases = {};

  // 创建数据库连接
  Object.keys(databases).forEach(async (k) => {
    const db = await mysql.createPool(databases[k]);

    app.context.databases[k] = db; // ????
  });

  app.use(require(entry));

  app.listen(port, () => {
    console.log('服务开始工作:', port);
  });
};
