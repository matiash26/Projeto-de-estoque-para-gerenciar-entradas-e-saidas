const mysql = require("mysql2/promise")
const client = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'sistema'
    })
    return connection
}
module.exports = { client }