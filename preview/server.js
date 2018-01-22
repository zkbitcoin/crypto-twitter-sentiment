var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

function start(port){
	app.listen(port);
	console.log('Preview listening on port', port);
}

module.exports = {
	start: start
}
