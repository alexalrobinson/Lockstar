CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);

INSERT INTO posts (author, content)
VALUES  ('J.K. Rowling', 'HarryPotter@gmail.com', 'Harry Potter');