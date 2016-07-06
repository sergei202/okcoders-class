var mongoose = require('mongoose');

var Item = mongoose.model('Item', {		// Define an Item model with the schema below
	name: String,
	qty: Number
});

module.exports = Item;
