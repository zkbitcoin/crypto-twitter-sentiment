// var twitter = require('./twitter/basic');
var twitterStream = require('./twitter/stream');
var socket = require('./socket/server');
var preview = require('./preview/server');
var opn = require('opn');


// Streaming
var channels = {
    "coins" : ['$XLM', '$ETH', '$CRPT', '$BNK', '$BTC', '$ETH']
};

socket.start(3000);
preview.start(3001);

twitterStream.start(channels, function(tick, tweet){
    var client = socket.getClient();
    if(client !== null){
        client.emit('tick', { tick: tick, tweet: tweet} );
    }
});

// open in browser
opn('http://localhost:3001');

// Static
// var term = {query: '$XLM'};
// twitter.search(term);
