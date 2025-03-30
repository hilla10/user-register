import fs from 'fs';
import query from './db.js';

const removeComments = (sql) => {
  return sql
    .replace(/--.*$/gm, '') // Remove single-line comments (-- comment)
    .replace(/#.*$/gm, '') // Remove single-line comments (# comment)
    .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments (/* comment */)
};

// reade schema.sql file and execute quires

fs.readFile('./schema.sql', 'utf-8', async (error, sql) => {
  if (error) {
    console.log('error creating table ', error.message);
  }

  const cleanSql = removeComments(sql);

  const queries = cleanSql
    .split(';') // split the schema by coma into individual statements
    .map((q) => q.trim()) // extract or remove any space from schema
    .filter((q) => q !== ''); // remove any empty queries from schema

  try {
    for (const q of queries) {
      await query(q);
    }

    console.log('table created successfully');
  } catch (error) {
    console.log('some error occurred', error);
  } finally {
    process.exit(); // force the script to exist
  }
});
