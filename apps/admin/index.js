const Router = require('koa-router');
const User = require('@models/user');
const redis = require('@mods/__redis');

const router = new Router();

router.get('/admin', async ctx => {
  ctx.body = await User.getUserById('xxxx');
});

router.get('/set', async ctx => {
  await redis.main.setAsync('name', 'caoxie');

  ctx.body = '设置成功';
});

router.get('/get', async ctx => {
  ctx.body = await redis.main.getAsync('name');
});

module.exports = router.routes();
