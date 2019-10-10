
const config = require('./config');
const cluster = require('cluster');


if (cluster.isMaster) { // 主进程 - 负责创建子进程
  console.log('主进程启动了');

  Object.keys(config.apps).forEach(k => {
    const app = config.apps[k];

    if (!app.enable) return;

    const worker = cluster.fork();

    console.log('新的子进程创建了', k);

    worker.send(app);
  });
} else { // 子进程 - 承担服务工作
  process.on('message', config => {
    const Koa = require('koa');

    const app = new Koa();

    app.listen(config.port, () => {
      console.log('服务开始工作:', config.port);
    });
  });

}
