const fs = require('fs');
const path = require('path');
const session = require('koa-session');
const { main } = require('@mods/__redis');

module.exports = async function(app) {
  app.keys = fs.readFileSync(path.join(__dirname, '../../\.keys'), 'utf8')
    .split(/\r\n|\n/).filter(_ => _);

  console.log(app.keys);

  app.use(session({
    maxAge: (1000 * 60 * 60) * 2, // 2 小时 (PHP 默认 20 分钟)
    autoCommit: true, // 自动写入、更新 session (cookie)
    renew: true, // 自动延期
    httpOnly: true, // 不让前端修改 (cookie)
    signed: true, // cookie 签名，防止修改
    store: {
      async get(key, maxAge) {

      },
      async set(key, session, maxAge) {

      },
      async destroy(key) {

      },
    },
  }, app));
};
