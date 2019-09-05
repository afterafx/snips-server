const shortid = require('shortid');
const format = require('pg-format');
const ErrorWithHttpStatus = require('../utils/error.httpStatus.utils');
const { readJSONFromDB, writeJSONToDB } = require('../utils/db.utils');
const db = require('../db');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/**
 * Inserts a new snippet into DB
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */

/* Create */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus('Missing Properties', 400);
    return await db.query(
      `INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [code, title, description, author, language]
    ).rows[0];
    // old method
    // if (!author || !code || !title || !description || !language)
    //   throw new ErrorWithHttpStatus('Missing Properties', 400);
    // const snippets = await readJSONFromDB('snippets');
    // snippets.push({
    //   id: shortid.generate(),
    //   author,
    //   code,
    //   title,
    //   description,
    //   language,
    //   comments: [],
    //   favorites: 0,
    // });
    // await writeJSONToDB('snippets', snippets);
    // return snippets[snippets.length - 1];
  } catch (error) {
    if (error instanceof ErrorWithHttpStatus) throw error;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/* Read */
/**
 * Selects snippets from db.
 * Can accept optional query objects to filter results.
 * Otherwise returns all snippets
 * @param {Object} [query]
 * @returns {Promise<Snippet>[]} array of Snippet Objects
 */

exports.select = async (query = {}) => {
  try {
    const clauses = Object.keys(query)
      .map((key, i) => `%I = $${i + 1}`)
      .join(' AND ');
    const formatedSelect = format(
      `SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)
    );
    const selectedQuery = await db.query(formatedSelect, Object.values(query));
    return selectedQuery.rows;

    // const result = await db.query('SELECT * FROM snippet');
    // return result.rows;
    // old method
    // const snippets = await readJSONFromDB('snippets');
    // const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    // return filtered;
  } catch (error) {
    console.error(error);
    throw new ErrorWithHttpStatus('Database error');
  }
};

/* Update */
/**
 *  Updates a specific ID in Snippets
 *  @param {string} id - id of the snippet tp update
 *  @param {Snippet} newData - subset of values to update
 */

exports.update = (id, newData) => {
  try {
    // newData.forEach(entry => db.query(`UPDATE snippet SET ${entry} WHERE id = ${id}`));
    Object.keys(newData).forEach(async key => {
      try {
        //
        const { author, code, title, description, language } = newData;
        await db.query(
          `UPDATE snippet 
          SET 
            author = COALESCE($2, author),
            code = COALESCE($3, code),
            title = COALESCE($4, title),
            description = COALESCE($5, description),
            language=COALESCE($6, language)
          WHERE id = ($1)`,
          [id, author, code, title, description, language]
        );
      } catch (error) {
        console.error(error);
      }
    });
    // old method
    // const snippets = await readJSONFromDB('snippets');
    // // if (snippets.filter())
    // const found = snippets.filter(snippet => snippet.id === id);
    // if (found.length === 0) {
    //   throw new ErrorWithHttpStatus('ID not found', 400);
    // }
    // const updatedSnippets = snippets.map(snippet => {
    //   if (snippet.id !== id) return snippet;
    //   Object.keys(newData).forEach(key => {
    //     if (key in snippet) {
    //       snippet[key] = newData[key];
    //     } else {
    //       throw new ErrorWithHttpStatus('Key does not exist', 400);
    //     }
    //   });
    //   return snippet;
    // });
    // return writeJSONToDB('snippets', updatedSnippets);
  } catch (error) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

/* Delete */
/**
 * Deletes a snippet with a given ID
 * @param {string} ID - id of snippet we want to delete
 */

exports.delete = async id => {
  try {
    // const result = await db.query(`SELECT TOP 1 id FROM snippet WHERE id = ${id}`);
    // console.log(result);
    return db.query(`DELETE FROM snippet WHERE id = ${id}`);
    // old method
    // const snippets = await readJSONFromDB('snippets');
    // const filtered = snippets.filter(snippet => snippet.id !== id);
    // if (filtered.length === snippets.length) throw new ErrorWithHttpStatus('Snippet does not exist', 400);
    // // TODO: error if trying to delete a snippet DNE
    // return writeJSONToDB('snippets', filtered);
  } catch (error) {
    console.error('ERROR: Entry was not deleted', error);
    throw error;
  }
};
