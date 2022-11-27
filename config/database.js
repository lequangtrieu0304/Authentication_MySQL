require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// pool.getConnection((err, connection) => {
//     if(err) throw err;
//     console.log('Database connected successfully!!!');
// })

module.exports = pool