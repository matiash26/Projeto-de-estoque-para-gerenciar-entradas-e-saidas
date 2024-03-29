const { client } = require("../../config/database");

const select = async () => {
  const mysql = await client();
  const sql =
    "SELECT e.id,p.id as idProduto, p.produto, e.data, e.status, e.estoque, p.valor FROM estoque as e join produtos as p on p.id = e.idProduto ORDER BY e.id desc;";
  const [row] = await mysql.query(sql);
  return row;
};
const insert = async (stock) => {
  const mysql = await client();
  const status = stock.status ? "1" : "0";
  const sql =
    "INSERT INTO estoque(idProduto, data, status, estoque) VALUES(?, ?, ?, ?);";
  const insert = [stock.id, getDate(), status, +stock.estoque];
  try {
    await mysql.query(sql, insert);
    return true;
  } catch (error) {
    return false;
  }
};
const update = async (stock) => {
  const status = stock.status ? "1" : "0";
  const mysql = await client();
  const sql =
    "UPDATE estoque set data = ?, status = ?, estoque = ? WHERE id = ?;";
  const update = [getDate(), status, +stock.estoque, stock.id];
  try {
    mysql.query(sql, update);
    return true;
  } catch (error) {
    return false;
  }
};
const Delete = async (id) => {
  const mysql = await client();
  const sql = "DELETE FROM estoque WHERE id = ?";
  try {
    await mysql.query(sql, id);
    return true;
  } catch (error) {
    return false;
  }
};
const desativeStock = async (active, id) => {
  const mysql = await client();
  const sql = "UPDATE estoque set status = ? WHERE id = ?;";
  const update = [active, id];
  try {
    await mysql.query(sql, update);
    return true;
  } catch (error) {
    return false;
  }
};
const findById = async (id) => {
  const mysql = await client();
  const sql = "select * from entradas where idEstoque = ?";
  const [row] = await mysql.query(sql, [id]);
  return row;
};
const find = async (search, active) => {
  const mysql = await client();
  let sql = "";
  let params = [];
  if (search && active) {
    sql =
      "SELECT e.id, e.idProduto, p.produto, e.estoque, e.data, e.status, p.valor FROM estoque as e join produtos as p on p.id = e.idProduto WHERE p.produto LIKE ? and e.status = ? OR e.status = ? ORDER BY e.id DESC;";
    params.push(search, `${search}%`, active);
  } else {
    sql =
      "SELECT e.id, e.idProduto, p.produto, e.estoque, e.data, e.status, p.valor FROM estoque as e join produtos as p on p.id = e.idProduto WHERE e.id = ? or e.status = ? ORDER BY e.id DESC;";
    params.push(search, active);
  }
  const [row] = await mysql.query(sql, params);
  return row;
};
const stockModify = async (stock, id) => {
  const mysql = await client();
  const sql = "UPDATE estoque set estoque = ? WHERE id = ?";
  return await mysql.query(sql, [stock, id]);
};
const desative = async (active, id) => {
  const mysql = await client();
  const sql = "UPDATE estoque set status = ?  WHERE id = ?";
  try {
    await mysql.query(sql, [active, id]);
    return true;
  } catch (error) {
    return false;
  }
};
const getDate = () => {
  const date = new Date();
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(
      2,
      "0"
    )}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};
module.exports = {
  find,
  select,
  insert,
  update,
  Delete,
  findById,
  desative,
  stockModify,
  desativeStock,
};
