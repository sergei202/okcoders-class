var mongoose = require('mongoose');
var express = require('express');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/week6');

var Item = require('./models/item');
var Order = require('./models/order');

checkData().then(function() {
	console.log('Done!');
}, function(err) {
	console.log('Error: ', err);
});


function checkData() {
	return Item.count().exec().then(function(count) {		// Count the number of items
		if(!count) return createData();						// If zero items, we need to create the data
		return queryData();									// If items exist, let's query the data
	});
}

function createData() {
	var item1 = new Item({
		sku: 'item1',
		name: 'Blue Widget',
		desc: 'The finest in widget quality lorem ipsum',
		cost: 2.50,
		price: 20,
		qtyAvail: 999
	});

	var item2 = new Item({
		sku: 'item2',
		name: 'Red Widget',
		desc: 'The cheapest in widget quality lorem ipsum',
		cost: 0.10,
		price: 0.99,
		qtyAvail: 999
	});

	var order = new Order({
		customer: {
			name: 'Sergei',
			email: 'sergei@dirtfarmer.com',
			address: '123 Dirt Farmer Lane'
		},
		shipped: false,
		lines: [{
			item: item1,
			price: item1.price,
			qty: 1
		},{
			item: item2,
			price: item2.price,
			qty: 5
		}]
	});
	order.orderTotal = order.lines.map(function(line) {return line.price*line.qty;}).reduce(function(a,b) {return a+b;});		// Quick way to multiply our price*qty and them sum the result

	return Promise.all([			// Promise.all() takes an array and only resolves after all the elements are resolved
		item1.save(),
		item2.save(),
		order.save()
	]);
}

function queryData() {
	return Order.findOne().lean().exec().then(function(order) {		// Query without populate()
		console.log('Order without populate:\n');
		console.dir(order, {depth:3, colors:true});
		return order;
	}).then(function() {
		return Order.findOne().populate('lines.item').lean().exec().then(function(order) {		// Query with populate().  Not that we pass the path (as a string) to what we want popualted
			console.log('\n\nOrder with populate:\n');
			console.dir(order, {depth:3, colors:true});
			return order;
		})
	});
}
