var server = require('http').createServer();
var socketServer = require('socket.io');
var port = 3000;

var io = socketServer(server, {
	path: '/'//,
	// serveClient: false,
	// // below are engine.IO options
	// pingInterval: 10000,
	// pingTimeout: 5000,
	// cookie: false
});

io.on('connection', function (socket) {
  console.log('new connection', socket);

  socket.emit('sentiment', 'hello!');
});

server.listen(port, function() {
	console.log('Socket listening on port', port);
});
