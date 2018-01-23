class Pipe {

	constructor(length) {
		this.length = length || 10;
		this.range = 3;
		this.array = [];
	}

	add(value) {
		this.array.push(value);
		if (this.array.length > this.length) {
			this.array.shift();
		}
		return this.array;
	}

	get() {
		return this.array;
	}

	simpleMovingAverage() {
		var sum = 0;
		for (var i = 0; i < this.array.length; i++) {
			sum += this.array[i];
		}
		return sum / this.array.length;
	}

	exponentialMovingAverage() {
		var k = 2 / (this.range + 1);
		// first item is just the same as the first item in the input
		var emaArray = [this.array[0]];
		// for the rest of the items, they are computed with the previous one
		for (var i = 1; i < this.array.length; i++) {
			emaArray.push(this.array[i] * k + emaArray[i - 1] * (1 - k));
		}
		return emaArray[emaArray.length - 1];
	}
}


var dps = []; // dataPoints
var dataLength = 100; // number of dataPoints visible at any point
var pipe = new Pipe(dataLength);

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	zoomEnabled: true,
	theme: "light1",
	backgroundColor: "#f0f8ff",
	title: {
		text: "Cryptomarket Sentiment"
	},
	axisY: {
		includeZero: true,
		interlacedColor: "#ffffff",
		gridDashType: "dash",
		stripLines: [{
			value: 0,
			label: "Neutral",
		}]
	},
	data: [{
		markerSize: 0,
		type: "rangeArea",
		dataPoints: dps
	}]
});

function updateChart(tick) {

	dps.push({
		x: new Date(),
		y: [tick, 0]
	});

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};
updateChart(0);


var count = 0;
var stop = true;

function toggleStream() {
	stop = !stop;
}

function addTestTweet() {
	var tweet = "RT @adam3us: @MYOFFICES @ArminVanBitcoin #Bitcoin blockchain detectives, figure it out! why did the fee rate just drop off a cliff?";
	var tweetList = document.getElementById('tweets');
	var tweetDiv = tweetFilter(tweet);//document.createTextNode(tweet);
	tweetList.insertBefore(tweetDiv, tweetList.firstChild);
	if (count > dataLength) {
		tweetList.removeChild(tweetList.lastChild);
	}
}

function tweetFilter(tweet) {

    var htmlString = tweet.split(" ").map(function(word){
        if(word.indexOf('@') === 0){
            return '<a href="#" target="_blank">'+word+'</a>';
        }

        if(word.indexOf('#') === 0){
            return '<a href="#" target="_blank">'+word+'</a>';
        }

        if(word.indexOf('$') === 0){
            return '<a href="#" target="_blank">'+word+'</a>';
        }

        if(word.indexOf('http') === 0){
            return '<a href="'+word+'" target="_blank">'+word+'</a>';
        }

        return word;
    }).join(" ");

    console.log(htmlString);

	var div = document.createElement('div');
	div.innerHTML = '<div class="tweet">'+htmlString.trim()+'</div>';

    console.log(div.firstChild);

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}

function addTweet(tweet) {
	if (stop) {
		return;
	}

	count++;
    var tweetList = document.getElementById('tweets');
	var tweetDiv = tweetFilter(tweet);//document.createTextNode(tweet);
	tweetList.insertBefore(tweetDiv, tweetList.firstChild);
	if (count > dataLength) {
		tweetList.removeChild(tweetList.lastChild);
	}
}

// socket
var socket = io.connect('http://localhost:3000');
socket.on('welcome', function(data) {
	console.log('Server said:', data);
});

socket.on('tick', function(tick) {
	//console.log('tick', tick);
	pipe.add(tick.tick);
	updateChart(pipe.simpleMovingAverage());
	addTweet(tick.tweet);
});
