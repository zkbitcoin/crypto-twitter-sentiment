var server = require('http').createServer();
var https = require('https');
var socketServer = require('socket.io');
const crypto = require('crypto');
const fs = require("fs");
var client = null; // hold socket here

var io = socketServer(server, {
	path: '/',
	serveClient: false,
	// // below are engine.IO options
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false
});

io.on('connection', function(socket) {
	socket.emit('welcome', 'hello!');
	client = socket;
});

function start(port){
	var options = {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	};
	https.createServer(options, function (req, res) {
		console.log('Socket listening on port', port);
	}).listen(port);

}

function getClient(){
	return client;
}

module.exports = {
	start: start,
	getClient: getClient
};
