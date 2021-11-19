// var twitter = require('./twitter/basic');
var twitterStream = require("./twitter/stream");
var socket = require("./socket/server");
var preview = require("./preview/server");
var opn = require("opn");

// Streaming
var channels = {
  coins: [
    "$PIVX",
    "PIVX",
  ],
};

var socketPort = process.env.PORT || 3000;
var previewPort = 3001;
socket.start(socketPort);
preview.start(previewPort);

twitterStream.start(channels, function (tick, tweet, username) {
  console.log(tweet);
  var client = socket.getClient();
  if (client !== null) {
    client.emit("tick", { tick: tick, tweet: tweet, username: username });
  }
});

// open in browser
opn("http://localhost:3001");

// Static
// var term = {query: '$XLM'};
// twitter.search(term);
