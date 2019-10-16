
/** 自己的办法 */
function require_non_cache(fullPath) {
  const model = require(fullPath);

  Object.keys(require.cache).forEach(id => {
    if (fullPath === id) {
      delete require.cache[id];
    }
  });

  return model;
}

/** 教程的方法 */
/* 由于 eval 的原因 __dirname 会出现问题
const fs = require('fs');
const path = require('path');

function myRequire(fullPath) {
  let str = fs.readFileSync(fullPath).toString();

  let module = {}; // 防止和全局 module 冲突
  // const __dirname = path.resolve(__dirname, '../');
  eval(str);
  return module.exports;
}

module.exports = { myRequire };
*/

module.exports = {
  require_non_cache
};
