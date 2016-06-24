var express = require('express');					// Load the express module

var app = express();								// Create our express app

app.use(express.static('./public'));				// Tell express to mount the public/ directory at the root mount point (implied if no mount point is specified)

app.listen(8080);									// Start our server
console.log('Listening at http://localhost:8080');
