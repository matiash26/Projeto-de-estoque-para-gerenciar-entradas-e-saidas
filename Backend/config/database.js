const { createPool } = require('mysql2/promise');

let globalPool = null;
async function client() {
    if (globalPool) {
        return globalPool;
    }
    globalPool = await createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'sistema',
        connectionLimit: 10
    });
    return globalPool;
}

module.exports = { client }