const express = require("express");
const app = express();
const request = require("request");
var http = require("http");
var fileSystem = require('fs');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var Twitter = require('twitter');
const PORT = 3000;

var client = new Twitter({
  consumer_key: 'LAbE11fcOY1MawSSYyYVvQYj',
  consumer_secret: 'kLdICEmZsupoNP4TZF8BUu4wi9xgCZZuBiHwrEfOHrG6OHcBl1',
  access_token_key: '150541662332628992-YYWa2GGU6Gg37FWGM6ilxlpJAocLS9',
  access_token_secret: 'RLiBqGTYQNLnhidaLnilBP6dLLp7175smeCVDLgxFlC6'
});


//present the user with a form to use application

app.get('/', function(req, res){ 
      fileSystem.readFile('./search.html', function(error, fileContent){
        if(error){
            res.writeHead(500,{'Content-Type': 'text/plain'});
            res.end('Error');
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(fileContent);
            res.end();
        }
    });

});


app.get('/response', (req, res) => {

    let ad = req.query.hashtag; //address entered by user
    
    client.get('search/tweets', {q: '#football'}, function(error, tweets, response) {
   console.log(tweets);
   res.send(tweets);
});
    
});



app.listen(PORT, () => {
    console.log("Server is listening on PORT " + PORT);
});
