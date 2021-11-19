const fs = require("fs");
var socketServer = require('socket.io');
var client = null; // hold socket here

const server = require("https").createServer({
	key: fs.readFileSync(process.env.SSL_KEY),
	cert: fs.readFileSync(process.env.SSL_CERT),
});

var io = socketServer(server, {
	path: '/',
	serveClient: false,
	// // below are engine.IO options
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false,
	secure:true,
	reconnect: true,
	rejectUnauthorized : false,
	cors: {
		origin: 'https://zkbitcoin.com:3001',
		credentials: true
	}
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
