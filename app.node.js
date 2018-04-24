var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var requestsArray = [];

app.get('/', function(req, res) {
  requestsArray.push({varProva:'ciao ciao'})
  res.send(requestsArray);
});

module.exports = app;
