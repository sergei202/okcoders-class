var mongoose = require('mongoose');

var Hit = mongoose.model('Hit', {		// Create a new model called Hit
	name: String,
	bounty: Number,
	location: String,
	contractor: String,
	status: String
});

module.exports = Hit;					// Export Hit
