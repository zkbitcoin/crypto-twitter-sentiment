var Twitter = require('twitter');
var SentimentAnalysis = require('sentiment-analysis');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET,
});

function searchTweets(params, callback){
	client.get('search/tweets', {q: params.query}, function(error, tweets, response) {
		callback(tweets.statuses);
	});
}

// Sentiment analysis for term: bitcoin
// searchTweets({query: '$XLM'}, function(tweets){
// 	var score = 0;
// 	tweets.forEach(function(t){
// 		var tweetScore = SentimentAnalysis(t.text);
// 		console.log(tweetScore + "\t" + t.text + "\n" + "__________________________");
// 		score += tweetScore;
// 	})
// 	console.log("********************************");
// 	console.log("Tweets analyzed:", tweets.length);
// 	console.log("Sentiment score:", score);
// });

module.exports = {
	search: searchTweets
};
