require("dotenv").config();

console.log("The liri is starting");

//Grab data from keys.js using node module imports
var request = require("request");
var spotify = require("spotify");
// var fs reads and writes files
var fs = require("fs");
var twitter = require("twitter");

var twitkey = require("./keys.js");
 console.log(keys);
var client = new Twitter(twitkey.twitterKeys);


//Stored argument's array

var inputArgs = process.argv;
var whatToDo = inputArgs[2];
var songMovie = inputArgs.slice(3);

directIt(whatToDo);


// //movie or song
// var x = "";
// //attaches multiple word arguments
// for (var i=3; i<nodeArgv.length; i++){
//   if(i>3 && i<nodeArgv.length){
//     x = x + "+" + nodeArgv[i];
//   } else{
//     x = x + nodeArgv[i];
//   }
// }

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

function showTweets(){
  //Display last 20 Tweets
  var params = {screen_name: "heidiBluem", count:20};
  
  //use Twitter npm to retrieve last 20 tweets
  client.get("statuses/user_timeline", params, function(error, tweets, response){
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

function spotifySong() {
    //console.log("songMovie is " + songMovie);
    if (songMovie == "") {
        //console.log("song not entered - using default")
		songMovie = "The Sign";
    };
    //console.log("songMovie is " + songMovie);
    
	//find the song that was entered on the command line and report song info
    spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
            console.log('Error occurred: ' + JSON.stringify(err));
        return;
    } else {
      //for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[0];
        ////console.log("spotify data " + JSON.stringify(songInfo));
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
    //     //adds text to log.txt
    //     fs.appendFile('log.txt', songData.artists[0].name);
    //     fs.appendFile('log.txt', songData.name);
    //     fs.appendFile('log.txt', songData.preview_url);
    //     fs.appendFile('log.txt', songData.album.name);
    //     fs.appendFile('log.txt', "-----------------------");
    //   }
    // } else{
    //   console.log('Error occurred.');
    };
  });
};

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
    //   //adds text to log.txt
    //   fs.appendFile('log.txt', "Title: " + body.Title);
    //   fs.appendFile('log.txt', "Release Year: " + body.Year);
    //   fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
    //   fs.appendFile('log.txt', "Country: " + body.Country);
    //   fs.appendFile('log.txt', "Language: " + body.Language);
    //   fs.appendFile('log.txt', "Plot: " + body.Plot);
    //   fs.appendFile('log.txt', "Actors: " + body.Actors);
    //   fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
    //   fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

    console.log("Rotten Tomatoes URL: " + omdbRec.tomatoURL);
} else {
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
    var splitData= data.split(",");
    whatToDo = splitData[0];
	songMovie = splitData[1];
	//console.log("whatToDo " + whatToDo + " and songMovie " + songMovie);
    directIt(whatToDo);
    
  })
};
