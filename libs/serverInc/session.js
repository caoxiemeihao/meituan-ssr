const session = require('koa-session');
const { main } = require('@mods/__redis');

module.exports = async function(app) {
  app.keys = [
    'LJDLJLENkdlfjl#$*&KLjfjldff!@3123',
    '*&$hfhtg%h^j4$njdffrjdf123nvoDOWF',
  ];

  app.use(session({
    maxAge: (1000 * 60 * 60) * 2, // 2 小时 (PHP 默认 20 分钟)
    autoCommit: true, // 自动写入、更新 session (cookie)
    renew: true, // 自动延期
    httpOnly: true, // 不让前端修改 (cookie)
    signed: true, // cookie 签名，防止修改
  }, app));
};
