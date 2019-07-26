const express = require('express');
const Snippet = require('./models/Snippet.model');
const snippets = require('./controller/snippets.controller');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('We are in the router');
  res.send('Welcome to Snips');
});

router.get('/api/', (req, res) => {
  res.send('Welcome to our Snips API');
});

/* Snippets Routes */
router.post('/api/snippets', snippets.createSnippet);

router.get('/api/snippets', snippets.getAllSnippets);

router.get('/api/snippets/:id', snippets.getOneSnippet);

router.patch('/api/snippets/:id', snippets.updateSnippet);

router.delete('/api/snippets/:id', snippets.deleteSnippet);

module.exports = router;
