var TwitterStreamChannels = require('twitter-stream-channels');
var SentimentAnalysis = require('sentiment-analysis');
require('dotenv').config();

var credentials = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET,
};

var client = new TwitterStreamChannels(credentials);

function startStream(channels){
	var stream = client.streamChannels({track:channels});
	stream.on('channels/coins',function(tweet){
		var tweetScore = SentimentAnalysis(tweet.text);
		console.log(logColor(tweetScore), 'SENTIMENT: '+tweetScore);
	    console.log(tweet.text);//any tweet with 'javascript','php','java','python','perl'
	});
}

function logColor(score){
	if (score < 0){
		return '\x1b[31m%s\x1b[0m';//red
	} else if (score > 0){
		return '\x1b[32m%s\x1b[0m';//green
	} else {
		return '\x1b[33m%s\x1b[0m';//yellow
	}
}

module.exports = {
	start: startStream
};
