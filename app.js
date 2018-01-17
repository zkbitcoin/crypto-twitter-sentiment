var Twitter = require('twitter');
require('dotenv').config();

var status = `
Binance is TEMPORARILY accepting new users! HURRY! 💰💸

▶️ binance.com/?ref=10880218 ◀️

Thank me later 😄

$NAS $ETH $RDD $NEO $ETC $GXS $REP $WTC $XLM $ARK $ICX $DOGE $QASH $BTC $ENG $GNT $SC $ZCL
`

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET,
});
 
var params = {screen_name: 'nodejs'};
// TEST
//printTimeline(params)

function tweet(status){
	client.post('statuses/update', {status: status}, function(error, tweet, response) {
		if (!error) {
			console.log(tweet);
		}
	});
}

function printTimeline(params){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		tweets.forEach(function(t){
			console.log(t.text);
		});
	});
}

tweet('test tweet');

