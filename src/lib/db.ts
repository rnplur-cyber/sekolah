import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// check if the required environment variables are set
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE || !process.env.DB_PORT) {
    throw new Error('Missing database credentials in .env file');
}

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;
