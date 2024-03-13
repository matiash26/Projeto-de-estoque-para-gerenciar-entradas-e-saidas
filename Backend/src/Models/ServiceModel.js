const { client } = require("../../config/database");

const select = async () => {
  const mysql = await client();
  const sql =
    "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') as data FROM servicos ORDER BY id DESC;";
  const [row] = await mysql.query(sql);
  return row;
};
const find = async (search) => {
  const mysql = await client();
  let sql =
    "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') as data FROM servicos WHERE DATE_FORMAT(data, '%Y-%m-%d') BETWEEN ? AND ? ORDER BY id DESC;";
  const [found] = await mysql.query(sql, [search.start, search.offset]);
  return found;
};
const insert = async ({ serviceName, spent }) => {
  const mysql = await client();
  const sql = "INSERT INTO servicos(servico, data, gasto) VALUES(?, ?, ?);";
  const insert = [serviceName, getDate(), +spent];
  try {
    mysql.query(sql, insert);
    return true;
  } catch {
    return false;
  }
};
const update = async ({ servico, gasto, id }) => {
  const mysql = await client();
  const sql = "UPDATE servicos set servico = ?, gasto = ? WHERE id = ?;";
  const update = [servico, gasto, id];
  try {
    mysql.query(sql, update);
    return true;
  } catch (error) {
    return false;
  }
};
const Delete = async (id) => {
  const mysql = await client();
  const sql = "DELETE FROM servicos WHERE id = ?";
  try {
    await mysql.query(sql, [id]);
    return true;
  } catch (error) {
    return false;
  }
};
const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
};
module.exports = {
  select,
  insert,
  update,
  Delete,
  find,
};
