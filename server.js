require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self' www.google.com www.gstatic.com 'unsafe-inline' 'unsafe-eval' data:;");
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/submit',function(req,res){
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  res.setHeader("Content-Security-Policy", "default-src 'self' www.google.com www.gstatic.com 'unsafe-inline' 'unsafe-eval' data:;");
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = process.env.SECRET_KEY;
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret="+secretKey+"&response="+req.body['g-recaptcha-response']+"&remoteip="+req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });
});

// This will handle 404 requests.
app.use("*",function(req,res) {
  res.status(404).send("404");
})

app.listen(port);