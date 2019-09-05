const pg = require('pg');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_DATABASE } = process.env;
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
// const client = new pg.Client(``);

const pool = new pg.Pool({
  connectionString,
});

module.exports = pool;
