import pool from './dbConfig.js';

const query = async (sql, params) => {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
};

export const fileQuery = async (sql, params) => {
  try {
    const [rows] = await pool.query(sql, [params]);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
};

export default query;
