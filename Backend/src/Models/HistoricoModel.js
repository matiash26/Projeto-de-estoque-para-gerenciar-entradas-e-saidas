const { client } = require("../../config/database")

const selectHistoric = () => {
    const mysql =  client()
    const sql = "SELECT *, DATE_FORMAT(data_da_venda, '%d/%m/%Y') as data , COUNT(pedido) AS produtos, SUM(quantidade * saida) AS total, SUM(quantidade * saida) - SUM(quantidade * entrada) AS lucro FROM historico GROUP BY pedido ORDER BY data_da_venda DESC";
    const [row] = mysql.query(sql);
    return row;
}
const selectHistoryByOrder = async (order) => {
    const mysql = await connection()
    const sql = "select *, h.id, h.saida * h.quantidade as total from historico as h join produtos as p on p.id = h.idProduto WHERE h.pedido = ?;"
    const [row] = await mysql.query(sql, order)
    return row
}
const filterDate = async (search) => {
    const mysql = await connection()
    let sql = "SELECT *, DATE_FORMAT(data_da_venda, '%d/%m/%Y') as data , COUNT(pedido) AS produtos, SUM(quantidade * saida) AS total, SUM(quantidade * saida) - SUM(quantidade * entrada) AS lucro FROM historico WHERE DATE_FORMAT(data_da_venda, '%Y-%m-%d') BETWEEN ? AND ? GROUP BY pedido ORDER BY id DESC;"
    const [found] = await mysql.query(sql, [search.start, search.offset])
    return found
}
const insertHistoric = async (product) => {
    const mysql = await connection()
    const sql = "INSERT INTO historico(pedido, idProduto, status, data_da_venda, quantidade, entrada, saida) VALUES(?, ?, ?, ?, ?, ?, ?);";
    const insert = [product.orderID, product.id, "coxinha", getDate(), product.quantidade, product.entrada, product.saida]
    try {
        await mysql.query(sql, insert)
        return true
    } catch {
        return false
    }

}
const updateHistoric = async (historic) => {
    const mysql = await connection()
    const sql = "UPDATE historico set status = ?, quantidade = ? WHERE id = ?;";
    const update = [historic.status, historic.quantidade, historic.id];
    try {
        await mysql.query(sql, update);
        return true
    } catch {
        return false
    }
}
const deleteHistoric = async (id) => {
    const mysql = await connection()
    const sql = "DELETE FROM historico WHERE pedido = ?"
    try {
        await mysql.query(sql, id)
        return true
    } catch {
        return false
    }
}
const verifyOrderIfExist = async (idOrder) => {
    const mysql = await connection()
    let sql = "SELECT distinct pedido FROM historico WHERE pedido = ?;"
    return await mysql.query(sql, idOrder)
}
const getDate = () => {
    const date = new Date()
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
}
module.exports = {
    selectHistoric,
    selectHistoryByOrder, insertHistoric,
    updateHistoric, deleteHistoric,
    filterDate, verifyOrderIfExist
}