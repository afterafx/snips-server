const express = require('express');
const cors = require('cors');
const router = require('./routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json()); // parses request with JSON bodies
app.use(logger);
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server Running on Port: 5000');
});
