const { client } = require("../../config/database")

const bestProducts = async (date, filter) => {
    const mysql = await connection()
    let sql = ""
    if (filter === "day") {
        sql = "select h.data_da_venda, p.produto, sum(h.saida * h.quantidade) - sum(h.entrada * h.quantidade) as lucro from historico as h join produtos as p on p.id = h.idProduto WHERE h.data_da_venda between ? and ? group by h.idProduto ORDER BY lucro desc;"
    } else if (filter === "monthsYear") {
        sql = "select h.data_da_venda, p.produto, sum(h.saida * h.quantidade) - sum(h.entrada * h.quantidade) as lucro from historico as h join produtos as p on p.id = h.idProduto WHERE DATE_FORMAT(h.data_da_venda, '%Y') = ? GROUP BY p.produto ORDER BY lucro desc LIMIT 10;"
    } else {
        sql = "select  p.produto, sum(h.saida * h.quantidade) - sum(h.entrada * h.quantidade) as lucro from historico as h join produtos as p on p.id = h.idProduto GROUP BY p.produto ORDER BY lucro desc LIMIT 10;"
    }
    const [row] = await mysql.query(sql, [`${date.filter}`, `${date.today}`])
    return row
}
const revenue = async (date, filter) => {
    const mysql = await connection()
    let sql = ""
    if (filter === "day") {
        sql = "select sum(saida * quantidade  - entrada * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from historico WHERE data_da_venda between ? and ?;"
    } else if (filter === "monthsYear") {
        sql = "select sum(saida * quantidade  - entrada * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from historico WHERE DATE_FORMAT(data_da_venda, '%Y') = ?;"
    } else {
        sql = "select sum(saida * quantidade  - entrada * quantidade) as total_ganho, count(DISTINCT pedido) as total_vendas from historico;"
    }
    let [row] = await mysql.query(sql, [date.filter, date.today])
    return row
}

const graphRevenue = async (date, filter) => {
    const mysql = await connection()
    let sql = ""
    if (filter === "day") {
        sql = "SELECT DATE_FORMAT(data_da_venda, '%d/%m/%Y') AS mes, COUNT(*) AS quantidade, SUM(saida * quantidade) - SUM(entrada * quantidade) AS lucro, DATE_FORMAT(data_da_venda, '%Y-%m') AS mes_ordenado FROM historico WHERE data_da_venda between ? and ? GROUP BY DATE_FORMAT(data_da_venda, '%d') ORDER BY mes_ordenado;"
    } else if (filter === "monthsYear") {
        sql = "SELECT DATE_FORMAT(data_da_venda, '%M de %Y') AS mes, COUNT(*) AS quantidade, SUM(saida * quantidade) - SUM(entrada * quantidade) AS lucro, DATE_FORMAT(data_da_venda, '%Y-%m') AS mes_ordenado FROM historico WHERE DATE_FORMAT(data_da_venda, '%Y') = ? GROUP BY DATE_FORMAT(data_da_venda, '%M') ORDER BY mes_ordenado;"
    } else {
        sql = "SELECT DATE_FORMAT(data_da_venda, '%Y') AS mes, COUNT(*) AS quantidade, SUM(saida * quantidade) - SUM(entrada * quantidade) AS lucro, DATE_FORMAT(data_da_venda, '%Y-%m') AS mes_ordenado FROM historico GROUP BY DATE_FORMAT(data_da_venda, '%Y') ORDER BY mes_ordenado;"
    }
    const [row] = await mysql.query(sql, [date.filter, date.today])
    return row
}
module.exports = {
    bestProducts,
    revenue,
    graphRevenue
}