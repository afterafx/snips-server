require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const dbInit = require('../db/init');
const db = require('../db/index');

beforeAll(async () => {
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedSnippets();
});

describe('Snippets', () => {
  describe('GET /api/snippets', () => {
    it('should get all of the snippets', async () => {
      // test the /api/snippets route
      const response = await request(app).get('/api/snippets');
    });
  });
});

afterAll(() => {
  // close db pool
  db.end();
});
