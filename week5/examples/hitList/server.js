var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hitList');		// Connect to the hitList database
mongoose.Promise = Promise;								// Tell mongoose to our ES6 promises

var app = express();
app.use(bodyParser());									// bodyParser will parse POST request body into req.body
app.use(express.static('./public'));					// Serve our static content

app.listen(8080, function() {
	console.log('Listening at http://localhost:8080');
});



var Hit = require('./models/hit');						// Import our Hit model from models/hit.js

app.get('/hits', function(req,res) {					// Return all the hits in the Hit models (the hits collection)
	Hit.find().sort({bounty:-1}).exec().then(function(hits) {		// Find a hits, sort by bounty descending, execute, and then...
		res.json(hits);			// Return the hits array
	});
});

app.post('/hits', function(req,res) {			// Anything POSTed to /hits will either be created or updated (depending if _id is defined)
	var hit = req.body;							// Reference req.body as hit for ease
	if(hit._id) {								// If hit._id exists then we know we are updating an existing document
		Hit.findOneAndUpdate({_id:hit._id}, hit).exec().then(function() {	// Find ONE document that matches {_id:hit._id} and set it's properties to the properties in 'hit'
			res.json(true);						// Return something arbitrary to let our client-side know we are done
		});
	} else {									// Else if hit._id is NOT defined...  we are creating a new document
		var newHit = new Hit(hit);				// Create a new document using the Hit model.  We set all of its properties to 'hit' (what was passed from the client)
		newHit.save().then(function() {			// we save newHit and then...
			res.json(true);						// Tell the client-side we are done
		});
	}
});
