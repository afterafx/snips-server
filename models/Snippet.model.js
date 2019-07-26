const shortid = require('shortid');
const ErrorWithHttpStatus = require('../utils/error.httpStatus.utils');
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
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus('Missing Properties', 400);

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
    const snippets = await readJSONFromDB('snippets');
    const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    return filtered;
  } catch (error) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

/* Update */
/**
 *  Updates a specific ID in Snippets
 *  @param {string} id - id of the snippet tp update
 *  @param {Snippet} newData - subset of values to update
 */

exports.update = async (id, newData) => {
  try {
    const snippets = await readJSONFromDB('snippets');
    // if (snippets.filter())
    const found = snippets.filter(snippet => snippet.id === id);
    if (found.length === 0) {
      throw new ErrorWithHttpStatus('ID not found', 400);
    }
    const updatedSnippets = snippets.map(snippet => {
      if (snippet.id !== id) return snippet;

      Object.keys(newData).forEach(key => {
        if (key in snippet) {
          snippet[key] = newData[key];
        } else {
          throw new ErrorWithHttpStatus('Key does not exist', 400);
        }
      });
      return snippet;
    });
    return writeJSONToDB('snippets', updatedSnippets);
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
    const snippets = await readJSONFromDB('snippets');
    const filtered = snippets.filter(snippet => snippet.id !== id);
    if (filtered.length === snippets.length) throw new ErrorWithHttpStatus('Snippet does not exist', 400);
    // TODO: error if trying to delete a snippet DNE
    return writeJSONToDB('snippets', filtered);
  } catch (error) {
    console.error('ERROR: Entry was not deleted', error);
    throw error;
  }
};
