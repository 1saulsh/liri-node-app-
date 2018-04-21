var action = process.argv[2];
var value = process.argv[3];
var Twitter = require('twitter');
// twitter keys variable, referencing the keys file and export line
var keys = require('./keys.js');
// assigning the keys
var client = new Twitter(keys.twitterKeys);
//what to search for
var params = {
    screen_name: 'heidiBluem',
    count: 20
    }
var request = require('request');

var fs = require('fs');

var spotify = require("spotify");

// set movie name equal to user input
var movieName = value;
var movieDefault = "Mr.Nobody";
// search url variable
var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';


switch (action) {
    case 'mytweets':
        myTweets();
        break;
    case 'spotify':
        spotifyThis(value);
        break;
    case 'omdb':
        omdbThis(value);
        break;
    case 'random':
        random();
        break;
}

// my-tweets function
function myTweets() {
    //using the npm
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        //if error, log it, else log the tweets
        if (error) {
            console.log(error);
            }
            else{
                // for loop to run through the length of my account's tweets
                console.log('Last 20 Tweets:')
                for (i = 0; i < tweets.length; i++) {
                    // adds a number and dot before to show order
                    console.log((i+1) + ". " + tweets[i].text);
                    }
                }
            });
             
// end myTweets function
}

// spotifyThis function
function spotifyThis() {
    spotify.search({type: 'track', query: value || 'ace of base the sign'}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
        //console.log("/////////Data////////")
        //console.log(data);
        //console.log("///////Data.tracks.items///////")
        var spotifyCall = data.tracks.items[0];
        //console.log(spotifyCall);
        //console.log("/////////spotifyCall.artists[0].name////////");
    
    // if no error, show me the information from the API
        console.log("\n/////////////////SPOTIFY THIS////////////////\n");
        var artist = spotifyCall.artists[0].name;
        console.log("Artist: " + artist);
        var song = spotifyCall.name;
        console.log("Song name: " + song);
        var preview = spotifyCall.preview_url;
        console.log("Preview Link: " + preview);
        var album = spotifyCall.album.name;
        console.log("Album: " + album);
    
    }
    });
    }
    
    //request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
  

//OMDB FUNCTION
function movie() {
    //npm package
  var request = require('request');
  // set movie name equal to user input
  var movieName = value;
  var movieDefault = "Mr.Nobody";
  // search url variable
  var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
  var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';
  
   // if the user entered a title, search that
   if (movieName != null) {
      request(url, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode == 200) {
                // Parse the body and pull for each attribute
                console.log("\n/////////////////MOVIE THIS////////////////\n")
                console.log("Title: " + value);
                console.log("Year: " + JSON.parse(body)["Year"]);
                console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Country of Production: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("Actors: " + JSON.parse(body)["Actors"]);
              };//end of if
        });//end of request
  
      // if user doesn't enter a value, value will be set to Mr.Nobody
      } else {
        request(urlDefault, function (error, response, body) {
          // If the request is successful (i.e. if the response status code is 200)
          if (!error && response.statusCode == 200) {
                console.log("Title: " + movieDefault);
                console.log("Year: " + JSON.parse(body)["Year"]);
                console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Country of Production: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("Actors: " + JSON.parse(body)["Actors"]);
              };//end of if
        });//end of request
      } // end of else
    } // end of movie()

// random function
function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    });
} // end doWhatItSays function