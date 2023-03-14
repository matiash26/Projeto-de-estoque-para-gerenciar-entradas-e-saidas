const { client } = require("../../config/database")

const select = async () => {
    const mysql = await client()
    const sql = "SELECT id, user, DATE_FORMAT(data, '%d/%m/%Y') as data FROM usuarios"
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
const update = async (picture, user, newPassword) => {
    const mysql = await client()
    let sql = "UPDATE usuario set picture = ?, user = ? password = ?"
    if (newPassword) {
        sql = "UPDATE usuario set picture = ?, user = ? password = ?"
    } else {
        sql = "UPDATE usuario set picture = ?, user = ?"
    }
    try {
        mysql.query(sql, [picture, user, newPassword])
        return true
    } catch {
        return false
    }
}
const getDate = () => {
    const date = new Date()
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
}
const signIn = async (user) => {
    const mysql = await client()
    const sql = "SELECT * FROM usuarios WHERE user = ?"
    try {
        const [row] = await mysql.query(sql, [user])
        return row
    } catch {
        return false
    }
}
module.exports = { select, insert, Delete, update, signIn }