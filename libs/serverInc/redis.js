const redis = require('redis');
const bluebird = require('bluebird');
let __redis = require('@mods/__redis');
const config = require('@config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = async function() {
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
};
