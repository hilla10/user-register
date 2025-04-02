import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const dbConfig = {
  password: '',
  user: 'root',
  host:'localhost',
  database: 'high_school',
  waitForConnections: true,
};

const pool = mysql.createPool(dbConfig);

export default pool;
