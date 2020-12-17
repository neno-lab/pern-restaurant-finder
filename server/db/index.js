const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restaurant_finder_db',
  password: 'admin',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
