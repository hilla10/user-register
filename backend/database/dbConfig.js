import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const dbConfig = {
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  waitForConnections: true,
};

const pool = mysql.createPool(dbConfig);

export default pool;
