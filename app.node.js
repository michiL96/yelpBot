var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const yelp = require('yelp-fusion');
const apiKey = process.env.API_KEY;

const client = yelp.client(apiKey);

var requestsArray = [];

app.get('/', function(req, res) {
  res.send(requestsArray);
});

app.post('/', function(req, res) {
  if (req.body.queryResult.action === 'search') {
    var term = req.body.queryResult.parameters.terms;
    var location = req.body.queryResult.parameters.location;

    var searchRequest = {
      term: term,
      location: location
    };
    client.search(searchRequest).then(response => {
      //const firstResult = response.jsonBody.businesses[0];
      //const prettyJson = JSON.stringify(firstResult, null, 4);
      //console.log(response);
      //console.log(prettyJson);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        speech: '',
        messages: [{
          type: 0,
          speech: 'Ricerca completata'
        }]
      }));
    }).catch(e => {
      console.log(e);
    });
  }
});

module.exports = app;
