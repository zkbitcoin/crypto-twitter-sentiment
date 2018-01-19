var twitter = require('./twitter/basic');
var twitterStream = require('./twitter/stream');

var channels = {
    "coins" : ['$TRX','$BTC','$ETH', '$NEO'],
    "js-frameworks" : ['angularjs','jquery','backbone','emberjs'],
    "web" : ['javascript','nodejs','html5','css','angularjs']
};

twitterStream.start(channels);
