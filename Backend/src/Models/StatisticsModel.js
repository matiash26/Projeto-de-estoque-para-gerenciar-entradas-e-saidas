const { client } = require("../../config/database")

const bestProducts = async (date, filter) => {
    const mysql = await client()
    let sql = ""
    if (filter === "day") {
        sql = "select e.data, p.produto, sum(e.valor * e.quantidade) lucro from entradas as e join produtos as p on p.id = e.idEstoque WHERE e.data between ? and ? group by e.idEstoque ORDER BY lucro desc;"
    } else if (filter === "montesYear") {
        sql = "select e.data, p.produto, sum(e.valor * e.quantidade) as lucro from entradas as e join produtos as p on p.id = e.idEstoque WHERE DATE_FORMAT(e.data, '%Y') = ? GROUP BY p.produto ORDER BY lucro desc LIMIT 10;"
    } else {
        sql = "select  p.produto, sum(e.valor * e.quantidade) as lucro from entradas as e join produtos as p on p.id = e.idEstoque GROUP BY p.produto ORDER BY lucro desc LIMIT 10;"
    }
    const [row] = await mysql.query(sql, [`${date.filter}`, `${date.today}`])
    return row
}
const revenue = async (date, filter) => {
    const mysql = await client()
    let sql = ""
    if (filter === "day") {
        sql = "select sum(valor * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from entradas WHERE data between ? and ?;"
    } else if (filter === "montesYear") {
        sql = "select sum(valor * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from entradas WHERE DATE_FORMAT(data, '%Y') = ?;"
    } else {
        sql = "select sum(valor * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from entradas;"
    }
    let [row] = await mysql.query(sql, [date.filter, date.today])
    return row
}
const graphRevenue = async (date, filter) => {
    const mysql = await client()
    let sql = ""
    if (filter === "day") {
        sql = "SELECT DATE_FORMAT(data, '%d/%m/%Y') AS mes, COUNT(*) AS quantidade, SUM(valor * quantidade) AS lucro, DATE_FORMAT(data, '%Y-%m') AS mes_ordenado FROM entradas WHERE data between ? and ? GROUP BY DATE_FORMAT(data, '%d') ORDER BY mes_ordenado;"
    } else if (filter === "monthsOfYear") {
        sql = "SELECT DATE_FORMAT(data, '%M de %Y') AS mes, COUNT(*) AS quantidade, SUM(valor * quantidade) AS lucro, DATE_FORMAT(data, '%Y-%m') AS mes_ordenado FROM entradas WHERE DATE_FORMAT(data, '%Y') = ? GROUP BY DATE_FORMAT(data, '%M') ORDER BY mes_ordenado;"
    } else {
        sql = "SELECT DATE_FORMAT(data, '%Y') AS mes, COUNT(*) AS quantidade, SUM(valor * quantidade) AS lucro, DATE_FORMAT(data, '%Y-%m') AS mes_ordenado FROM entradas GROUP BY DATE_FORMAT(data, '%Y') ORDER BY mes_ordenado;"
    }
    const [row] = await mysql.query(sql, [date.filter, date.today])
    return row
}
module.exports = {
    bestProducts,
    revenue,
    graphRevenue
}