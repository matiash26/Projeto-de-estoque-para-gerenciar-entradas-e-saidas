const { client } = require("../../config/database");

const select = async () => {
  const mysql = await client();
  const sql =
    "SELECT id, user, DATE_FORMAT(data, '%d/%m/%Y') as data FROM usuarios";
  const [row] = await mysql.query(sql);
  return row;
};

const insert = async (userName, Password) => {
  const mysql = await client();
  const sql =
    "INSERT INTO usuarios(picture, user, data, password) VALUES(?, ?, ?, ?)";
  const insert = ["default.jpg", userName, getDate(), Password];
  try {
    await mysql.query(sql, insert);
    return true;
  } catch (error) {
    return false;
  }
};
const Delete = async (id) => {
  const mysql = await client();
  const sql = "DELETE FROM usuarios WHERE id = ?";
  try {
    await mysql.query(sql, [id]);
    return true;
  } catch {
    return false;
  }
};
const update = async (picture, userName, password, id) => {
  const mysql = await client();
  let sql =
    "UPDATE usuarios set picture = ?, user = ?, password = ? WHERE id = ?";
  try {
    await mysql.query(sql, [picture, userName, password, id]);
    return true;
  } catch {
    return false;
  }
};
const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
};
const signIn = async (user) => {
  const mysql = await client();
  const sql =
    "SELECT id, picture, user, password FROM usuarios WHERE user = ?;";
  try {
    const [row] = await mysql.query(sql, [user]);
    return row;
  } catch {
    return false;
  }
};
const findById = async (id) => {
  const mysql = await client();
  const sql =
    "SELECT SQL_NO_CACHE id, picture, user, password FROM usuarios WHERE id = ?;";
  try {
    const [row] = await mysql.query({
      sql: sql,
      nestTables: true,
      values: [id],
    });
    return row[0].usuarios;
  } catch {
    return false;
  }
};
module.exports = { select, insert, Delete, update, signIn, findById };
