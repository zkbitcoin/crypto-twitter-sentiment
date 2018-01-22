var server = require('http').createServer();
var socketServer = require('socket.io');
var client = null; // hold socket here

var io = socketServer(server, {
	path: '/' //,
	// serveClient: false,
	// // below are engine.IO options
	// pingInterval: 10000,
	// pingTimeout: 5000,
	// cookie: false
});

io.on('connection', function(socket) {
	socket.emit('welcome', 'hello!');
	client = socket;
});

function start(port){
	server.listen(port, '0.0.0.0', function() {
		console.log('Socket listening on port', port);
	});
}

function getClient(){
	return client;
}

module.exports = {
	start: start,
	getClient: getClient
};
