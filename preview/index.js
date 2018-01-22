class Pipe {

	constructor(length){
		this.length = length || 10;
		this.array = [];
	}

	add(value){
		this.array.push(value);
		if(this.array.length > this.length){
			this.array.shift();
		}
		return this.array;
	}

	get(){
		return this.array;
	}

	average(){
	    var sum = 0;
	    for( var i = 0; i < this.array.length; i++ ){
	        sum += this.array[i]; //don't forget to add the base
	    }
	    return sum / this.array.length;
	}
}


var dps = []; // dataPoints
var dataLength = 20; // number of dataPoints visible at any point
var pipe = new Pipe(dataLength);

var chart = new CanvasJS.Chart("chartContainer", {
	title: {
		text: "Cryptomarket Sentiment"
	},
	axisY: {
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: dps
	}]
});

function updateChart(tick) {

	dps.push({
		x: new Date(),
		y: tick
	});

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};
updateChart(0);


var count = 0;
function addTweet(tweet) {
	count++;
	var tweetList = document.getElementById('tweets');
	var tweetDiv = document.createElement('div');
	var tweetText = document.createTextNode(tweet);
	tweetDiv.appendChild(tweetText);
	tweetList.insertBefore(tweetDiv, tweetList.firstChild);
	if(count > dataLength){
		tweetList.removeChild(tweetList.lastChild);
	}

}

// socket
var socket = io.connect('http://localhost:3000');
socket.on('welcome', function(data) {
	//console.log('Server said:', data);
});

socket.on('tick', function(tick) {
	//console.log('tick', tick);
	pipe.add(tick.tick);
	updateChart(pipe.average());
	addTweet(tick.tweet);
});
