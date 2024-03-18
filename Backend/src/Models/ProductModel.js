const { client } = require("../../config/database");

const select = async () => {
  const mysql = await client();
  const sql = "SELECT * FROM produtos WHERE status = '1' ORDER BY id DESC;";
  const [row] = await mysql.query(sql);
  return row;
};
const find = async (search, status) => {
  const mysql = await client();
  let sql = "";
  let params = [];
  if (search && status) {
    sql =
      "SELECT * FROM produtos WHERE id = ? OR produto LIKE ? and status = ? ORDER BY id DESC;";
    params.push(search, `${search}%`, status);
    return;
  }
  sql = "SELECT * FROM produtos WHERE id = ? or status = ? ORDER BY id DESC;";
  params.push(search, status);
  const [row] = await mysql.query(sql, params);
  return row;
};
const findById = async (id) => {
  const mysql = await client();
  const sql = "SELECT * from estoque where idProduto = ?";
  try {
    const [row] = await mysql.query(sql, [id]);
    return row;
  } catch (error) {
    return false;
  }
};
const insert = async ({ product, status, value }) => {
  const mysql = await client();
  const active = status ? "1" : "0";
  const sql = "INSERT INTO produtos(produto, status, valor) VALUES(?, ?, ?);";
  const insert = [product, active, +value];
  try {
    mysql.query(sql, insert);
    return true;
  } catch {
    return false;
  }
};
const update = async ({ produto, status, valor, id }) => {
  const statusToggle = status ? "1" : "0";
  const mysql = await client();
  const sql =
    "UPDATE produtos set  produto = ?, status = ?, valor = ? WHERE id = ?;";
  const update = [produto, statusToggle, valor, id];
  try {
    mysql.query(sql, update);
    return true;
  } catch (error) {
    return false;
  }
};
const desative = async (id) => {
  const mysql = await client();
  const sql = "UPDATE produtos set status = '0'  WHERE id = ?";
  try {
    await mysql.query(sql, [id]);
    return true;
  } catch (error) {
    return false;
  }
};
const deleteProduct = async (id) => {
  const mysql = await client();
  const sql = "DELETE from produtos where id = ?";
  try {
    await mysql.query(sql, [id]);
    return true;
  } catch (error) {
    return false;
  }
};
module.exports = {
  find,
  select,
  update,
  insert,
  desative,
  findById,
  deleteProduct,
};
