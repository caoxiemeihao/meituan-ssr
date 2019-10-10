
const path = require('path');

module.exports = {
  apps: {
    admin: {
      enable: true,
      entry: path.resolve(__dirname, 'apps/admin'),
      port: 8080,
    },
    meishi: {
      enable: true,
      entry: path.resolve(__dirname, 'app/meishi'),
      port: 8081,
    }
  }
};
