var twitter = require('./twitter/basic');
var twitterStream = require('./twitter/stream');
var socket = require('./socket/server');


// Streaming
var channels = {
    "coins" : ['$XLM', '$ETH', '$CRPT', '$BNK']
};

twitterStream.start(channels, function(tick, average, tweet){
    var client = socket.getClient();
    if(client !== null){
        client.emit('tick', tick);
        client.emit('average', average);
        client.emit('tweet', tweet);
    }
});


// Static
// var term = {query: '$XLM'};
// twitter.search(term);
