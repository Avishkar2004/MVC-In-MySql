const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDBConnection() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'avi',
    });
    console.log("Connected to MySQL.");
    return db;
  } catch (error) {
    console.error("Failed to connect to MySQL:", error.message);
    throw error; // Re-throw the error to handle it later if needed
  }
}

module.exports = createDBConnection;
