
const path = require('path');

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  apps: {
    admin: {
      name: 'admin',
      enable: true,
      entry: resolve('apps/admin'),
      port: 8080,
      version: 1,
    },
    meishi: {
      name: 'meishi',
      enable: true,
      entry: resolve('apps/meishi'),
      port: 8081,
      version: 1,
    }
  },

  databases: {
    web: {
      name: 'web',
      hose: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'meituan',
    },
  },

  redis: {
    main: {
      name: 'main',
      host: 'localhost',
      prot: 6379,
      password: undefined, // 空密码就是 undefined
    }
  },
};
