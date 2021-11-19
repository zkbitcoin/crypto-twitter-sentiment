var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var https = require('https');

app.use(express.static(__dirname));

/*
function start(port){
	app.listen(port, '0.0.0.0');
	console.log('Preview listening on port', port);
}
*/

function start(port){
	var options = {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	};
	https.createServer(options, app).listen(port);
	console.log('Preview listening on port', port);
}

module.exports = {
	start: start
}
