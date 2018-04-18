require("dotenv").config();

//console.log("The liri is starting");
//console.log(process.argv);

//Grab data from keys.js using node module imports
var request = require("request");
var spotify = require("spotify");
// var fs reads and writes files
var fs = require("fs");
var Twitter = require("twitter");
//load exports from keys.js file which has Twitter auth keys
var twitKey = require("./keys.js");
//console.log(twitKey);
var client = new Twitter(twitKey.twitterKeys);

//Stored argument's array
var inputArgs = process.argv;
var whatToDo = inputArgs[2];
var songMovie = inputArgs.slice(3);

directIt(whatToDo);

//functions
function directIt(play) {
//switch case
switch(play){
  case "my-tweets":
    showTweets();
    break;

  case "spotify-this-song":
    getSong();
    break;

  case "movie-this":
    getMovieInfo();
    break;

  case "do-what-it-says":
    doThing();
    break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    };
};

//get most recent twitter tweets
function showTweets(){
  //Twitter API parameters & Display last 20 Tweets
  var params = {screen_name: "heidiBluem", count:20};
  console.log(client);
  //use Twitter npm to retrieve last 20 tweets
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if(!error){
        //array to hold tweets
        var twits = []; 
    for(var i = 0; i<tweets.length; i++){
        twits.push({
        "created at: " : tweets[i].created_at,
        "tweets: " : tweets[i].text
        });
    }
    console.log(twits);
    }else {
    console.log("faiure on twitter" + JSON.stringify(error));
    };
  });
};

//get song from spotify
function spotifySong() {
    console.log("songMovie is " + songMovie);
    if (songMovie == "") {
        console.log("song not entered - using default")
		    songMovie = "The Sign";
    };
    console.log("songMovie is " + songMovie);
    
	//find the song that was entered on the command line and report song info
    spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
            console.log('Error occurred: ' + JSON.stringify(err));
        return;
    } else {
      //for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[0];
        console.log("spotify data " + JSON.stringify(songInfo));
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
    };
  });
};

//get info about entered movie title from OMDB
function getMovieInfo() {
    //console.log("Movie entered " + songMovie);
    if (songMovie == "") {
		songMovie = "Mr Nobody";
	};
	//console.log("Movie entered " + songMovie);

  var omdbURL = 'https://www.omdbapi.com/?t=' + songMovie + "&y=&plot=short&tomatoes=true&r=json";

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var omdbRec = JSON.parse(body);

      console.log("Title: " + omdbRec.Title);
      console.log("Release Year: " + omdbRec.Year);
      console.log("IMdB Rating: " + omdbRec.imdbRating);
      console.log("Country: " + omdbRec.Country);
      console.log("Language: " + omdbRec.Language);
      console.log("Plot: " + omdbRec.Plot);
      console.log("Actors: " + omdbRec.Actors);
      console.log("Rotten Tomatoes Rating: " + omdbRec.tomatoRating);
      console.log("Rotten Tomatoes URL: " + omdbRec.tomatoURL);

      for (var i = 0; i < omdbRec.Ratings.length; i++) {
        if (omdbRec.Ratings[i].Source === "Rotten Tomatoes") {
            console.log("Rotten Tomatoes Rating: " + omdbRec.Ratings[i].Value);
        };
    };
    
      console.log("Rotten Tomatoes URL: " + omdbRec.tomatoURL);
    }else {
      console.log("Error in OMDB call");
        };
    });
};
    
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

    //   //adds text to log.txt
    //   fs.appendFile('log.txt', "-----------------------");
    //   fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    //   fs.appendFile('log.txt', "It's on Netflix!");
    }

function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    //split the data by the comma so you can access the first part which is which type of search we are doing and the second part which is the userSelection of what we are looking up
	var things = data.split(',');
    var splitData= data.split(",");
    whatToDo = splitData[0];
	songMovie = splitData[1];
	//console.log("whatToDo " + whatToDo + " and songMovie " + songMovie);
    directIt(whatToDo);
    
  })
};
