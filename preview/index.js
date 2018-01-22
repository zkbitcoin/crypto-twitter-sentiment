	var dps = []; // dataPoints
	var dataLength = 20; // number of dataPoints visible at any point

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
		updateChart(tick.tick);
		addTweet(tick.tweet);
	});
