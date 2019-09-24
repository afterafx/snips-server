const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Get the token
  const auth = req.headers.authorization;
  if (!auth) return res.send(401);
  const token = auth.split(' ')[1];
  // 2. Verify it
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.send(401);
  }
};
