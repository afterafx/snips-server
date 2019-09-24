const express = require('express');
const validate = require('./middleware/validate');
// const Snippet = require('./models/Snippet.model');
// const Author = require('./models/Author.model');
const snippets = require('./controller/snippets.controller');
const authors = require('./controller/author.controller');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('We are in the router');
  res.send('Welcome to Snips');
});

router.get('/api/', (req, res) => {
  res.send('Welcome to our Snips API');
});

/* Snippets Routes */
router.post('/api/snippets', validate, snippets.createSnippet);

router.get('/api/snippets', snippets.getAllSnippets);

router.get('/api/snippets/:id', snippets.getOneSnippet);

router.patch('/api/snippets/:id', validate, snippets.updateSnippet);

router.delete('/api/snippets/:id', validate, snippets.deleteSnippet);

/** User Routes */
router.post('/api/signup', authors.signup);

router.get('/api/login', authors.login);

module.exports = router;
