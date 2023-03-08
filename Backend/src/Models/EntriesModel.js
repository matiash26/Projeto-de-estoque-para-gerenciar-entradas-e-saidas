const { client } = require("../../config/database")

const select = async() => {
    const mysql =  await client()
    const sql = "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') as data , COUNT(pedido) AS produtos, SUM(quantidade * valor) AS total FROM entradas GROUP BY pedido ORDER BY data DESC;";
    const [row] = await mysql.query(sql);
    return row;
}
const selectByOrder = async (order) => {
    const mysql = await client()
    const sql = "select e.id, e.idEstoque, es.idProduto, p.produto, e.valor * e.quantidade as total, es.estoque, e.quantidade, e.valor from entradas as e join estoque as es on es.id = e.idEstoque join produtos as p on p.id = es.idProduto WHERE e.pedido = ?;"
    const [row] = await mysql.query(sql, order)
    return row
}
const insert = async (entries) => {
    const mysql = await client()
    const sql = "INSERT INTO entradas(pedido, idEstoque, data, quantidade, valor) VALUES(?, ?, ?, ?, ?);";
    const insert = [entries.orderID, entries.id, getDate(), entries.quantidade, +entries.valor]
    try {
        mysql.query(sql, insert)
        return true
    } catch {
        return false
    }
}
const update = async (entries) => {
    const mysql = await client()
    const sql = "UPDATE entradas set quantidade = ? WHERE id = ?;";
    const update = [entries.quantidade, entries.id];
    try {
        await mysql.query(sql, update);
        return true
    } catch {
        return false
    }
}
const Delete = async (id) => {
    const mysql = await client()
    const sql = "DELETE FROM entradas WHERE pedido = ?"
    try {
        await mysql.query(sql, id)
        return true
    } catch {
        return false
    }
}
const filterDate = async (search) => {
    const mysql = await client()
    let sql = "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') as data , COUNT(pedido) AS produtos, SUM(quantidade * valor) AS total FROM entradas WHERE DATE_FORMAT(data, '%Y-%m-%d') BETWEEN ? AND ? GROUP BY pedido ORDER BY id DESC;"
    const [found] = await mysql.query(sql, [search.start, search.offset])
    return found
}
const verifyOrderIfExist = async (idOrder) => {
    const mysql = await client()
    let sql = "SELECT distinct pedido FROM entradas WHERE pedido = ?;"
    return await mysql.query(sql, idOrder)
}
const getDate = () => {
    const date = new Date()
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
}
module.exports = {
    select,
    selectByOrder, insert,
    update, Delete,
    filterDate, verifyOrderIfExist
}