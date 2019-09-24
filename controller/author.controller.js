const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require('../models/Author.model');
const ErrorWithHttpStatus = require('../utils/error.httpStatus.utils');

exports.login = async (req, res, next) => {
  try {
    const author = await Author.select(req.body.name);
    if (!author) throw new ErrorWithHttpStatus('User does not exist', 404);
    const isMatched = await bcrypt.compare(req.body.password, author.password);
    if (!isMatched) throw new ErrorWithHttpStatus('Invaild Login Credentials', 401);

    const token = jwt.sign(author.name, process.env.JWT_SECRET);

    res.send({ message: 'logged in!', token });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 6);
    await Author.insert({
      name: req.body.name,
      password: hashedPassword,
    });
    res.status(201).send('Signed Up!');
  } catch (error) {
    next(error);
  }
};
