const express = require('express');
const router = require('./routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
app.use(express.json()); // parses request with JSON bodies
app.use(logger);
app.use(router);
app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server Running on Port: 5000');
});
