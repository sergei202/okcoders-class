var express = require('express');			// Import express
var bodyParser = require('body-parser');	// We use bodyParser to parse POST requests
var mongoose = require('mongoose');			// Import mongoose

mongoose.Promise = Promise;							// Set the default Promise handler to the global ES6 Promise.
mongoose.connect('mongodb://localhost/okcoders');	// Connect to the local MongoDB instance and use 'okcoders' as the database.

var app = express();								// Create our express application
app.use(express.static('./public'));				// Serve our static content out of public/
app.use(bodyParser());								// Use the bodyParser to parse our POST requests
app.listen(8080, function() {						// Start our server
	console.log('Listening on http://localhost:8080');
});

var Item = require('./models/item');				// Import our Item model (defined in models/item.js)

app.get('/items', function(req,res) {				// Define a GET /items route
	Item.find().exec().then(function(items) {		// Find all items
		res.json(items);							// Return all items found
	});
});

app.post('/items', function(req,res) {				// Define a POST /items route
	var item = new Item(req.body);					// Create a new item document from the body
	item.save().then(function() {					// Save the item and then...
		res.json(true);								// Return true (true has no meaning here, we easily could return the item we just created)
	});
});
