var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;		// Less typing for later

var Order = mongoose.model('Order', {
	customer: {				// customer is a nested object
		name: String,
		email: String,
		address: String
	},
	orderDate: Date,		// Note that we save Date objects
	shipped: Boolean,		// We can save boolean as well
	lines: [{				// lines is an array of objects with the structure below
		item: {type:ObjectId, ref:'Item'},		// Create a reference to the Item model
		qty: Number,
		price: Number
	}],
	orderTotal: Number
});

module.exports = Order;
