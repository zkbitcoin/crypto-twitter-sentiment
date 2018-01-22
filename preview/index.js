window.onload = function() {

	var dps = []; // dataPoints
	var chart = new CanvasJS.Chart("chartContainer", {
		title: {
			text: "Sentiment"
		},
		axisY: {
			includeZero: false
		},
		data: [{
			type: "line",
			dataPoints: dps
		}]
	});

	var dataLength = 20; // number of dataPoints visible at any point
	var values = [];
	var updateChart = function (tick) {

		dps.push({
			x: new Date(),
			y: tick
		});

		chart.render();
	};
	updateChart(0);


	// socket
	var socket = io.connect('http://localhost:3000');
    socket.on('welcome', function (data) {
        //console.log('Server said:', data);
    });

	socket.on('tick', function(tick) {
		//console.log('tick', tick);
		updateChart(tick);
	});

	socket.on('average', function(average) {
		//console.log('average', average);
	});

	socket.on('tweet', function(tweet) {
		//console.log('tweet', tweet);
		var tweetList = document.getElementById('tweets');
		var tweetDiv = document.createElement('div');
		var tweetText = document.createTextNode(tweet);
		tweetDiv.appendChild(tweetText);
		tweetList.appendChild(tweetDiv);
	});
}
