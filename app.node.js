var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const yelp = require('yelp-fusion');
const apiKey = process.env.API_KEY;

const client = yelp.client(apiKey);

var requestsArray = [];

app.get('/yelpBot', function(req, res) {
  res.send(requestsArray);
});

app.post('/yelpBot', function(req, res) {
  console.log("here");
  if (req.body.queryResult.action === 'search') {
    var term = req.body.queryResult.parameters.terms;
    var location = req.body.queryResult.parameters.location;
    console.log("location: "+location);
    var searchRequest = {
      term: term,
      location: location
    };
    client.search(searchRequest).then(response => {
      var results = response.jsonBody.businesses;
      var maxLimit = 20;
      var messages = [{
        "text": {
          "text": ["Restaurants found:"]
        }
      }];

      for (var i = 0; i < results.length && i < maxLimit; i++) {
        messages.push({
          "text": {
            "text": ["Name: " + results[i].name + "; Location: " + results[i].location.city + ", " + results[i].location.country]
          }
        });
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "fulfillmentMessages": messages
      }));
    }).catch(e => {
      console.log(e);
    });
  }
});

module.exports = app;
