// const shortid = require('shortid');
const format = require('pg-format');
const ErrorWithHttpStatus = require('../utils/error.httpStatus.utils');
// const { readJSONFromDB, writeJSONToDB } = require('../utils/db.utils');
const db = require('../db');

/**
 * @typedef {Object} Snippet
 * @property {string} author
 * @property {string} password
 */

// Mine!
exports.insert = ({ name, password }) => {
  try {
    if (!name || !password) throw new ErrorWithHttpStatus('Missing Properties', 400);
    return db.query(`INSERT INTO author (name, password) VALUES ($1, $2)`, [name, password]);
  } catch (error) {
    if (error instanceof ErrorWithHttpStatus) throw error;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

exports.select = async name => {
  try {
    if (!name) throw new ErrorWithHttpStatus('Missing Properties', 400);
    return (await db.query(`SELECT * FROM author WHERE name = $1`, [name])).rows[0];
  } catch (error) {
    console.error(error);
    throw new ErrorWithHttpStatus('Database error');
  }
};
