var twitter = require('./twitter/basic');
var twitterStream = require('./twitter/stream');
var socket = require('./socket/server');


// Streaming
var channels = {
    "coins" : ['$XLM', '$ETH', '$CRPT', '$BNK', '$BTC', '$ETH']
};

twitterStream.start(channels, function(tick, tweet){
    var client = socket.getClient();
    if(client !== null){
        client.emit('tick', { tick: tick, tweet: tweet} );
    }
});


// Static
// var term = {query: '$XLM'};
// twitter.search(term);
