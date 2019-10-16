require('module-alias/register');

const cluster = require('cluster');
const path = require('path');
const { require_non_cache } = require('@/libs/common');
const server = require('@/libs/server');
let config = require('@/config');


/** 创建子进程 */
function creageWorker(app) {
  if (!app.enable) return;

  const worker = cluster.fork();

  worker.on('exit', code => {
    console.log(`[${app.name}]子进程退出`, code);

    if (code) {
      // 重启子进程
      setTimeout(() => {
        creageWorker(app);
      });
    }
  });

  console.log('新的子进程:', app.name, 'version',app.version);

  worker.send(app);

  return worker;
}

if (cluster.isMaster) {
  // 主进程 - 负责创建子进程
  console.log('主进程启动');

  Object.keys(config.apps).forEach(k => {
    const app = config.apps[k];

    const worker = creageWorker(app);

    app.worker = worker;
  });

  // 版本监控，重启服务
  setInterval(() => {
    const newConfig = require_non_cache(path.resolve(__dirname, './config.js'));

    Object.keys(newConfig.apps).forEach(k => {
      const newApp = newConfig.apps[k];
      const oldApp = config.apps[k];

      if (newApp.version !== oldApp.version) {
        // 启动一个新的进程
        newApp.worker = creageWorker(newApp);

        // 通知老进程 close
        oldApp.worker.send('close new connection');
      } else {
        newApp.worker = oldApp.worker;
      }
    });

    config = newConfig; // 更新配置
  }, 1000);

} else {
  // 子进程 - 承担服务工作
  let httpd;

  process.on('message', async (config) => {
    if (config === 'close new connection') {
      httpd.close(() => {
        console.log('老进程退出');
        process.exit(0);
      });
    } else {
      httpd = await server(config);
    }
  });

}
