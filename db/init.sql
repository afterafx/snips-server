DROP TABLE IF EXISTS snippet;

CREATE TABLE snippet (
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  author TEXT,
  favorites INT DEFAULT 0,
  language TEXT,
);

INSERT INTO 
  snippet (code, title, description, language, author) 
VALUES ('4+4', 'hi', 'this is code', 'javascript', 'kevin'), ('const you = terrible', 'bye', 'this is code', 'javascript', 'kevin');