var twitter = require('./twitter/basic');
var twitterStream = require('./twitter/stream');


// Streaming
var channels = {
    "coins" : ['$TRX','$BTC','$ETH', '$NEO']
};
twitterStream.start(channels);

// Static
// var term = {query: '$XLM'};
// twitter.search(term);
