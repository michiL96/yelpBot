const app = require('./app.node.js');

//var porta = 8080;
var porta = process.env.PORT || 5000;
app.listen(porta, function() {
  console.log('Il server è aperto.');
});
