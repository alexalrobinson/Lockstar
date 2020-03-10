require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//const request = require('request');

const port = process.env.PORT || 8080;
const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const getPosts = (request, response) => {
  pool.query('SELECT * FROM posts', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addPost = (request, response) => {
  const { author, content } = request.body

  pool.query('INSERT INTO posts (author, content) VALUES ($1, $2)', [author, content], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Post added.' })
  })
}

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self' www.google.com www.gstatic.com 'unsafe-inline' 'unsafe-eval' data:;");
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app
  .route('/posts')
  // GET endpoint
  .get(getPosts)
  // POST endpoint
  .post(addPost)

// This will handle 404 requests.
app.use("*",function(req,res) {
  res.status(404).send("404");
})

app.listen(port);