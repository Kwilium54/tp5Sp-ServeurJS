import mysql from 'mysql2/promise'

// Named export = auto-importé par Nitro dans tous les fichiers server/api/
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'tp5_user',
  password: process.env.DB_PASSWORD || 'tp5_password',
  database: process.env.DB_NAME || 'tp5_db',
  waitForConnections: true,
  connectionLimit: 10,
})
