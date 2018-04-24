var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const yelp = require('yelp-fusion');
const apiKey = process.env.API_KEY;

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

var requestsArray = [];

app.get('/', function(req, res) {
  requestsArray.push({varProva:'ciao ciao'});

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });
  
  res.send(requestsArray);
});

module.exports = app;
