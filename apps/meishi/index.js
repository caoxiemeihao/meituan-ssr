const Router = require('koa-router');

const router = new Router();

router.get('/admin', async ctx => {
  ctx.body = 'meishi';
});

module.exports = router.routes();
