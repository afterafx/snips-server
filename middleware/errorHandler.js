const ErrorWithHttpStatus = require('../utils/error.httpStatus.utils');

/**
 * Sends appropiate error message and code to the client
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const errorHandler = (error, req, res, next) => {
  if (error instanceof ErrorWithHttpStatus) res.status(error.status).send(error.message);
  else res.status(500).send('Server Error');
  // console.error(error);
};

module.exports = errorHandler;
