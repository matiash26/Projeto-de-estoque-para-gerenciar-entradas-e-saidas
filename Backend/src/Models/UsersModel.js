const { client } = require("../../config/database")

const select = async () => {
    const mysql = await client()
    const sql = "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') as data FROM usuarios"
    const [row] = await mysql.query(sql)
    return row
}
const insert = async (userName, Password) => {
    const mysql = await client()
    const sql = "INSERT INTO usuarios(user, data, password) VALUES(?, ?, ?)"
    const insert = [userName, getDate(), Password]
    try {
        await mysql.query(sql, insert)
        return true
    } catch (error) {
        return false
    }
}
const Delete = async (id) => {
    const mysql = await client()
    const sql = "DELETE FROM usuarios WHERE id = ?"
    try {
        await mysql.query(sql, [id])
        return true
    } catch {
        return false
    }
}
const getDate = () => {
    const date = new Date()
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
}
module.exports = { select, insert, Delete }