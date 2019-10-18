const mysql = require('promise-mysql');
let __db = require('@mods/__databases');
const config = require('@config');


module.exports = async function() {
  Object.keys(config.databases).forEach(async (k) => {
    const db = await mysql.createPool(config.databases[k]);

    // await db.query(`SHOW TABLES`); // 检测数据库是否能工作

    __db[k] = db;
  });
};
