console.log("the liri is starting");

//using .env to hide keys
require("dotenv").config();

//Dependencies
// import the keys file the keys file 
var keys = require("./keys.js");

//Import the Twitter NPM package
var Twitter = require("twitter");
// assigning the keys
var client = new Twitter(keys.twitter);

//import the Spotify NPM package 
// var spotify = require("spotify");
// var spotify = new Spotify(keys.spotify)

//Import the request npm package
var request = require("request");

//Import the FS package fo read/write
var fs = require("fs");

//Grab the input from the command line
//var movieName = process.argv[3];
var liriReturn = process.argv[2];

//swutches for various commands
switch(liriReturn) {
    case "my-tweets":
    myTweets();
    break;

    // case"spotify-this-song":
    // spotifyThisSong();
    // break;

    // case"movie-this":
    // movieThis();
    // break;

    // case "do-what-it-says":
    // doWhatItSays();
    // break;
   
    //instructions for first-time user
    default: console.log("\r\n" + "type any command after 'node liri.js': " + "\r\n" +
        "my-tweets 'any twitter name' " + "\r\n" 
        // "spotify-this-song 'any song title'" + "\r\n" +
        // "movie-this 'any movie title'" + "\r\n" +
        // "do-what-it-says." + "\r\n" +
        // "use quotes for multiword titles");
        //break;
    
    )};


//funciton my-tweets and errors
function myTweets() {
    var params = {
        screen_name: "heidiBluem",
        count:20
    };
    console.log(params);

    //using the npm to ask twitter to search for user tweet
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        //if an error log it, else log the tweets
        if (!error) {
            for(var i = 0; i < tweets.length; i++) {
                //console.log(response); // Show the full response in the terminal
                var twitterResults = 
                "@" + tweets[i].user.screen_name + ": " + 
                tweets[i].text + "\r\n" + 
                tweets[i].created_at + "\r\n" + 
                "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                //log(twitterResults); // calling log function
            }
        }  else {
            console.log("Error :"+ error);
            return;
        }
    });
}
//console.log(tweets);
        


//spotify-this-song... 

//Function for running a Spotify search, use the spotify tool to request a search for the track name as the "data" variable
// function spotifyThisSong(songName) {
//     var songName = process.argv[3];
//     if(!songName) {
//         songName = "I want it that way";
//     };
//     songRequest = songName;
//     spotify.search({
//         type: "track",
//         query: songRequest
//     },
//     function (err,data) {
//         if(err) {
//             var trackInfo = data.tracks.items;
//             for(var i=0; i<songs.length; i++) {
//                 if (trackInfo[i] != undefined) {
//                     var spotifyResults =
//                         "Artist:" + trackInfo[i].artists[0].name + "\n"+
//                         "song:" + trackInfo[i].name + "\n" +
//                         "Preview URL:" + trackInfo[i].preview.url + "\n" +
//                         "Album:" + trackInfo[i].album.name + "\n"
//                     console.log(spotifyResults);
//                     console.log (" ");
//                 };
//             }; 
//         } else {
//             console.log("error:" + err);
//             return;
//         };
//     });
// };        
                
// //movie this... run a request to the OMDB API with the movie specified

// function movieThis() {
  
//   // search url variable
//   var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
//   // if the user entered a title, search that
//   request (queryUrl, function (error, response, body) {

//     //if the request is successful
//     if (!error && response.statusCode == 200) {

//         //pull requested data in readable format & parse the body and pull for each attribut e
//         var myMovieData = JSON.parse(body);
//         var queryUrlResults =
//             "Title:" + myMovieData.Title + "\r\n" +
//             "Year:" + myMovieData.Year + "\r\n" +
//             "IMDB Rating:" + myMovieData.Ratings[0].value + "\r\n" +
//             "Origin COuntry:" + myMovieData.Country + "\r\n" +
//             "Language:" + myMovieData.Language + "\r\n" +
//             "Plot:" + myMovieData.Plot + "\r\n" +
//             "Actors:" + myMovieData.Actors + "\r\n"
//         console.log(queryUrlResults);
//     } else {
//         console.log("error:" + err);
//         return;
//     };
// });
// };        

    
       
               
               
// // random function
// function random() {
//     fs.readFile('random.txt', 'utf8', function(error, data) {
//         if (error) {
//             console.log(error);
//         } else {
//             var dataArr = data.split(',');
//             if (dataArr[0] === 'spotify') {
//                 spotifyThis(dataArr[1]);
//             }
//             if (dataArr[0] === 'omdb') {
//                 omdbThis(dataArr[1]);
//             }
//         }
//     });
//} 