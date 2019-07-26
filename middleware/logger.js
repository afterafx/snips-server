const fs = require('fs').promises;
const path = require('path');

const logPath = path.join(__dirname, '..', 'log.txt');

function logger(req, res, next) {
  try {
    const log = `Method: ${req.method} Path: ${req.path} Timestamp:${Date.now()}\n`;
    console.log(log);
    fs.appendFile(logPath, log);
    next(); // move on to the next piece of middleware
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = logger;
