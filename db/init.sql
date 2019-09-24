DROP TABLE IF EXISTS snippet;
DROP TABLE IF EXISTS author;

CREATE TABLE author (
  name TEXT PRIMARY KEY,
  password TEXT
);

CREATE TABLE snippet (
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  author TEXT REFERENCES author,
  favorites INT DEFAULT 0,
  language TEXT
);

INSERT INTO
  author (name, password)
VALUES ('kevin', 'admin'), ('scott', 'password');

INSERT INTO 
  snippet (code, title, description, language, author) 
VALUES ('4+4', 'hi', 'this is code', 'javascript', 'kevin'), ('const you = terrible', 'bye', 'this is code', 'javascript', 'kevin');