const http = require('http');
const Koa = require('koa');

const config = require('@/config');

const mysql = require('promise-mysql');
let __db = require('@/mods/__databases');

const redis = require('redis');
const bluebird = require('bluebird');
let __redis = require('@/mods/__redis');


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


module.exports = async function ({ port, entry, name }) {
  const app = new Koa();

  // 创建数据库连接
  Object.keys(config.databases).forEach(async (k) => {
    const db = await mysql.createPool(config.databases[k]);

    // await db.query(`SHOW TABLES`); // 检测数据库是否能工作

    __db[k] = db;
  });

  // 创建 redis 连接
  Object.keys(config.redis).forEach(async (k) => {
    const client = redis.createClient(config.redis[k]);

    // 检测 redis 是否能工作
    await client.setAsync('__$$test$$', 99);
    if (99 !== +await client.getAsync('__$$test$$')) {
      throw '[libs/server.js]: redis init faild';
    }
    await client.delAsync('__$$test$$');


    __redis[k] = client;
  });


  app.use(require(entry));

  /*
  app.listen(port, () => {
    console.log('服务开始工作:', port);
  });
  */
  const httpServer = http.createServer(app.callback());

  httpServer.listen(port, () => {
    console.log('服务开始工作:', name, `prot@${port}`);
  });

  return httpServer;
};
