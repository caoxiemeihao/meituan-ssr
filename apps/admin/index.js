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

router.get('/cookie', async ctx => {
  if (!ctx.session.count) {
    // 第一次访问
    ctx.session.count = 0;
  }
  ctx.session.count += 1;
  ctx.body = `欢迎━(*｀∀´*)ノ亻!第${ctx.session.count}次访问`;
});

module.exports = router.routes();
