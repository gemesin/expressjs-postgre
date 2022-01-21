const Pool = require('pg').Pool

//konfigurasi database
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'radius',
    password: 'root',
    port: 5432,
})

db.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
})

module.exports = db;