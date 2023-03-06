const { client } = require("../../config/database")

const selectProducts = async () =>{
    const mysql = await client()
    const sql = "SELECT * FROM produtos WHERE status = '1';";
    const [row] = await mysql.query(sql)
    return row
}
const findProducts = async (search, status) => {
    const mysql = await client();
    let sql = ""
    let params = []
    if(search && status) {
        sql = 'SELECT * FROM produtos WHERE id = ? OR produto LIKE ? and status = ? ORDER BY id DESC;'
        params.push(search, `${search}%`, status)
    }else{
        sql = 'SELECT * FROM produtos WHERE id = ? or status = ? ORDER BY id DESC;'
        params.push(search, status)
    }
    const [row] = await mysql.query(sql, params);
    return row;
}
const insertProducts = ({ produto, valor }) => {
    const sql = "INSERT INTO produtos(produto, valor) VALUES(?, ?);";
    const insert = [produto, valor];
    try {
        client.query(sql, insert)
        return true
    } catch {
        return false
    }
}
const updateProducts = async ({produto, valor}) => {
    const mysql = await client();
    const sql = "UPDATE produtos set produto = ?, valor = ?";
    const update = [produto, valor];
    try {
        mysql.query(sql, update);
        return true
    } catch (error) {
        return false
    }
}
const deleteProducts = async (id) => {
    const mysql = await client();
    const sql = "DELETE FROM produtos WHERE id = ?"
    try {
        await mysql.query(sql, id)
        return true
    } catch (error) {
        return false
    }
}
const desativeProducts = async (active, id) => {
    const mysql = await client()
    const sql = "UPDATE produtos set status = ?  WHERE id = ?"
    try {
        await mysql.query(sql, [active, id])
        return true
    } catch (error) {
        return false
    }
}
module.exports = {
    selectProducts,insertProducts, 
    updateProducts, deleteProducts,
    desativeProducts,findProducts
}
