const mysql = require('mysql2/promise');

// Crea la conexión
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'Proyecto_Teleton3',
  password: 'Mendoza1239',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;