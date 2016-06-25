var express = require('express');					// Load the express module
var zipcodes = require('zipcodes');					// Load for the zipcode.html example

var app = express();								// Create our express app

app.use(express.static('./public'));				// Tell express to mount the public/ directory at the root mount point (implied if no mount point is specified)

app.listen(8080);									// Start our server
console.log('Listening at http://localhost:8080');


// Let's define a few simple routes for basic.html
app.get('/ping', function(req,res) {				// Define a /ping route
	res.send('pong');								// Send back 'pong'
});
app.get('/time', function(req,res) {				// Define a /time route
	var now = new Date();							// now stores a Date object
	res.send(now.toString());						// Reply back with 'now' casted as a string
});

// Define a /zipcode route for the example in zipcode.html
app.get('/zipcode/:zip', function(req,res) {		// Our route with a 'zip' paramater
	var location = zipcodes.lookup(req.params.zip);	// Lookup the zipcode and store the resulting object as a location variable
	res.json(location);								// This time we use `res.json()` to send back the Javascript object, not a string version of it
});
