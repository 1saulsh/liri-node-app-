console.log('this is loaded');

//Twitter
exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

//Spotify
exports.spotify = {
  client_id: process.env.SPOTIFY_ID,
  client_secret: process.env.SPOTIFY_SECRET
};




