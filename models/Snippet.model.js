const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const { readJSONFromDB, writeJSONToDB } = require('../utils/db.utils');

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
    if (!author || !code || !title || !description || !language) throw Error('Missing Properties');
    const snippets = await readJSONFromDB('snippets');
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    await writeJSONToDB('snippets', snippets);
    return snippets[snippets.length - 1];
  } catch (error) {
    console.error('ERORR: Snippet did not post');
    console.error(error);
    throw error;
  }
};

/* Read */
/**
 * Selects snippets from db.
 * Can accept optional query objects to filter results.
 * @param {Object} [query]
 * @returns {Promise<Snippet>[]} array of Snippet Objects
 */

exports.select = async (query = {}) => {
  try {
    const snippets = await readJSONFromDB('snippets');
    const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    return filtered;
  } catch (error) {
    console.error('ERROR: in Snippet Model');
    console.error(error);
    throw error;
  }
};
/* Update */

/**
 *  Updates a specific ID in Snippets
 *  @param {string} id
 */

exports.update = async (id, newData) => {
  try {
    const snippets = await readJSONFromDB('snippets');
    const updatedSnippets = snippets.map(snippet => {
      if (snippet.id !== id) return snippet;
      Object.keys(newData).forEach(key => {
        if (key in snippet) {
          snippet[key] = newData[key];
        }
      });
      return snippet;
    });
    // const filtered = snippets.filter(snippet => snippet.id === id);
    // const updatedSnips = Object.assign(snippets, filtered);
    // console.log(updatedSnips);
    return writeJSONToDB('snippets', updatedSnippets);
  } catch (error) {
    console.error(error);
  }
};

/* Delete */
/**
 * Deletes a snippet with a given ID
 * @param {string} ID
 */

exports.delete = async id => {
  try {
    const snippets = await readJSONFromDB('snippets');
    const filtered = snippets.filter(snippet => snippet.id !== id);
    return writeJSONToDB('snippets', filtered);
  } catch (error) {
    console.error('ERROR: Entry was not deleted', error);
    throw error;
  }
};
