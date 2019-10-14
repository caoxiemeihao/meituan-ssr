
/** 自己的办法
exports.require_non_cache = function(name) {
  const model = require(name);

  Object.keys(require.cache).forEach(id => {
    if (new RegExp(`${name}\\.js`).test(id)) {
      delete require.cache(id)
    }
  });

  return model;
}
*/


/** 教程的方法 */
const fs = require('fs');

function myRequire(path) {
  let str = fs.readFileSync(path).toString();

  let module = {}; // 防止和全局 module 冲突
  eval(str);
  return module.exports;
}

module.exports = { myRequire };
