const pg = require('pg');
require('dotenv').config();

const connectionString =
  process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.TEST_DATABASE_URL;

console.log(connectionString);

const pool = new pg.Pool({
  connectionString,
});

module.exports = pool;
