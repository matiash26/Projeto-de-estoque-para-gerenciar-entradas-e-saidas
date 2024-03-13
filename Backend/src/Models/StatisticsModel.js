const { client } = require("../../config/database");

const bestProducts = async (date, filter) => {
  const mysql = await client();
  let sql = "";
  if (filter === "day") {
    sql =
      "SELECT  p.produto, COUNT(*) AS quantidade_total, SUM(e.valor * e.quantidade) AS lucro FROM  entradas AS e JOIN  estoque AS es ON es.id = e.idEstoque JOIN  produtos AS p ON es.idProduto = p.id WHERE  e.data BETWEEN ? AND ? GROUP BY  p.produto;";
  } else if (filter === "monthsOfYear") {
    sql =
      "SELECT YEAR(e.data) AS ano, p.produto, SUM(e.valor * e.quantidade) AS lucro FROM entradas AS e JOIN estoque AS es ON es.id = e.idEstoque JOIN produtos AS p ON es.idProduto = p.id WHERE YEAR(e.data) = ? GROUP BY YEAR(e.data), p.id ORDER BY lucro DESC LIMIT 10;";
  } else {
    sql =
      "select p.produto, sum(e.valor * e.quantidade) lucro from entradas as e join estoque as es on es.id = e.idEstoque join produtos as p on es.idProduto = p.id GROUP BY p.produto ORDER BY lucro desc LIMIT 10;";
  }
  const [row] = await mysql.query(sql, [date.start, date.today]);
  return row;
};
const revenue = async (date, filter) => {
  const mysql = await client();
  let sql = "";
  if (filter === "day") {
    sql =
      "select sum(valor * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from entradas WHERE data between ? and ?;";
  } else if (filter === "monthsOfYear") {
    sql =
      "select sum(valor * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from entradas WHERE DATE_FORMAT(data, '%Y') = ?;";
  } else {
    sql =
      "select sum(valor * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from entradas;";
  }
  const [row] = await mysql.query(sql, [date.start, date.today]);
  return row;
};
const graphRevenue = async (date, filter) => {
  const mysql = await client();
  let sql = "";
  if (filter === "day") {
    sql =
      "SELECT DATE_FORMAT(data, '%d/%m/%Y') AS mes, COUNT(*) AS quantidade, SUM(valor * quantidade) AS lucro, DATE_FORMAT(data, '%Y-%m') AS mes_ordenado FROM entradas WHERE data between ? and ? GROUP BY DATE_FORMAT(data, '%d/%m/%Y'), DATE_FORMAT(data, '%Y-%m') ORDER BY mes_ordenado;";
  } else if (filter === "monthsOfYear") {
    sql =
      "SELECT DATE_FORMAT(data, '%M de %Y') AS mes, COUNT(*) AS quantidade, SUM(valor * quantidade) AS lucro, DATE_FORMAT(data, '%Y-%m') AS mes_ordenado FROM entradas WHERE DATE_FORMAT(data, '%Y') = '?' GROUP BY mes, mes_ordenado ORDER BY mes_ordenado;";
  } else {
    sql =
      "SELECT DATE_FORMAT(data, '%Y') AS mes, COUNT(*) AS quantidade, SUM(valor * quantidade) AS lucro, DATE_FORMAT(data, '%Y-%m') AS mes_ordenado FROM entradas GROUP BY mes, mes_ordenado ORDER BY mes_ordenado;";
  }
  const [row] = await mysql.query(sql, [date.start, date.today]);
  return row;
};
const expenses = async (date, filter) => {
  const mysql = await client();
  let sql = "";
  if (filter === "day") {
    sql =
      "select DATE_FORMAT(data, '%d/%m/%Y') AS mes, sum(gasto) as gasto FROM servicos WHERE data between ? and ? GROUP BY id ORDER BY mes;";
  } else if (filter === "monthsOfYear") {
    sql =
      "SELECT DATE_FORMAT(data, '%M de %Y') AS mes, sum(gasto) as gasto FROM servicos WHERE DATE_FORMAT(data, '%Y') = '?' GROUP BY mes ORDER BY mes;";
  } else {
    sql =
      "SELECT DATE_FORMAT(data, '%Y') AS mes, sum(gasto) as gasto from servicos GROUP BY DATE_FORMAT(data, '%Y') ORDER BY mes;";
  }
  const [row] = await mysql.query(sql, [date.start, date.today]);
  return row;
};
module.exports = {
  bestProducts,
  revenue,
  graphRevenue,
  expenses,
};
