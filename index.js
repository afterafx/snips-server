const Snippet = require('./models/Snippet.model');

async function testSnippetUpdate() {
  try {
    const snippet = await Snippet.update('6GFadX6zZ', { author: 'Kevin' });
    console.log(snippet);
  } catch (error) {
    console.error(error);
  }
}

async function testSnippetSelect() {
  try {
    const snippets = await Snippet.select();
    console.log(snippets);
  } catch (error) {
    console.error(error);
  }
}

async function testSnippetInsert() {
  try {
    const newSnippet = await Snippet.insert({
      author: 'Kass',
      code: 'code code code',
      title: 'All your base are belong to us',
      description: 'does not compute',
      language: 'assembly',
    });
    console.log(newSnippet);
  } catch (error) {
    console.error(error);
  }
}

async function testSnippetDelete(id) {
  try {
    const snippets = await Snippet.delete(id);
    console.log(snippets);
  } catch (error) {
    console.error(error);
  }
}

// testSnippetSelect();
// testSnippetInsert();
testSnippetDelete('6GFadX6zZ');

// testModels();
