

const cluster = require('cluster');
const path = require('path');
const { myRequire } = require('./libs/common');
const server = require('./libs/server');
let config = require('./config');


setInterval(() => {
  const newConfig = myRequire(path.resolve(__dirname, './config.js'));

  // if (newConfig.apps)
}, 1000);


function creageWorker(app) {
  if (!app.enable) return;

  const worker = cluster.fork();

  worker.on('exit', code => {
    console.log('子进程退出了', code);

    if (code) {
      creageWorker(app);
    }
  });

  console.log('新的子进程创建了', app.name);

  worker.send(app);
}

if (cluster.isMaster) { // 主进程 - 负责创建子进程
  console.log('主进程启动了');

  Object.keys(config.apps).forEach(k => {
    const app = config.apps[k];

    creageWorker(app);
  });
} else { // 子进程 - 承担服务工作
  process.on('message', async (config) => {
    await server(config);
  });

}
