const { createPool } = require('mysql2/promise');
require("dotenv").config()

let globalPool = null;
async function client() {
    if (globalPool) {
        return globalPool;
    }
    globalPool = await createPool({
        host: process.env.HOST,
        port: 3306,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DATABASE,
        connectionLimit: 10
    });
    return globalPool;
}

module.exports = { client }