require("dotenv").config();

//Grab data from keys.js using node module imports
// var fs reads and writes files
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var client = new twitter(keys.twitterKeys);
