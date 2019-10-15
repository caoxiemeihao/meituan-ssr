const __db = require('@/mods/__databases');

async function getUserById(id) {
  const rows = await __db.web.query(`SELECT * FROM user_table WHERE ID=?`, [id]);

  return rows[0];
}

async function getUserByName(name) {

}

async function getUserList(page) {

}

module.exports = {
  getUserById,
  getUserByName,
  getUserList,
};
