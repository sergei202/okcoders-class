var express = require('express');
var app = express();

app.use(express.static('./public'));
app.listen(8080, function() {
	console.log('Server listening at http://localhost:8080');
});

app.get('/ping', function(req,res) {		// This is called from ping.html
	res.json('pong');
});

app.get('/uptime', function(req,res) {		// This is called from uptime.html
	var uptime = process.uptime();			// process.uptime() is the number of seconds our node server has been running
	res.json(uptime);
});
