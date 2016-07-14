var mongoose = require('mongoose');

var Item = mongoose.model('Item', new mongoose.Schema({
	sku: String,
	name: String,
	desc: String,
	cost: Number,
	price: Number,
	qtyAvail: Number,
	location: String
}));

module.exports = Item;
