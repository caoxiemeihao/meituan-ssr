const Router = require('koa-router');
const User=require('@/models/user');

const router = new Router();

router.get('/admin', async ctx => {
  ctx.body = await User.getUserById('xxxx');
});

module.exports = router.routes();
