CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);

INSERT INTO posts (author, content)
VALUES  ('J.K. Rowling', 'Harry Potter');