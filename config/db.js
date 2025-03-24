// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'editorial',
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error de conexión a la base de datos:', err.stack);
//         return;
//     }
//     console.log('Conexión exitosa a la base de datos MySQL');
// });

// module.exports = db;


const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "editorial",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error de conexión a la base de datos:", err.stack);
    } else {
        console.log("✅ Conexión exitosa a la base de datos MySQL");
        connection.release();
    }
});

module.exports = pool.promise();
