var mongoose = require('mongoose');					// Dont forget to 'npm install mongoose'
mongoose.Promise = global.Promise;					// Tell mongoose to our ES6 promises

mongoose.connect('mongodb://localhost/test');		// Connect to our local MongoDB instance and use the 'test' database

var Item = mongoose.model('Item', {					// Our Item model has this schema:
	sku: String,		// We list properties and their types
	name: String,		// 'name' is always a string
	price: Number,		// 'price' and 'qty' are always numbers
	qty: Number
});

function createCatFood() {
	var catFood = new Item({		// Create a new item using the same properties that we used before
		sku: '80334',
		name: 'Cat Food',
		price: 8.99,
		qty: 5
	});

	var p = catFood.save();	// We just have to save() our document to save it into MongoDB.
	p.then(function(doc) {
		console.log('catFood saved successfully: %j', doc);
	}, function(error) {
		console.log('catFood save erorr: %j', error);
	});
}

function listItems() {
	return Item.find().exec().then(function(items) {
		console.log('items: %j', items);
		return items;
	});
}

function decreaseCatFoodQty() {
	return Item.findOne({sku:'80334'}).exec().then(function(item) {		// Find one item that has a sku of '80334'
		if(!item) return Promise.reject('Item not found!');				// Bail out if the item isn't found
		if(item.qty<=0) {
			return Promise.reject('Item quantity too low!');				// Return a rejected Promise because qty needs to be at least 1.
		}
		item.qty--;							// Decrease the qty by one
		return item.save();					// Save the item changes and return a Promise (document.save() always returns a Promise)
	});
}

listItems().then(function(items) {			// listItems()
	if(!items.length) {
		return createCatFood();				// Create a cat food item if no items exist
	} else {
		return decreaseCatFoodQty();		// Decrease qty if item does exist
	}
}).then(function() {
	console.log('All done');				// This is called after the returned Promise above is done
}, function(error) {
	console.log('Error: ', error);				// This will catch any errors and console them out
});
