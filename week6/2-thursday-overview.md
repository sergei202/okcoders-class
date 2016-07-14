Overview for Thursday, July 14th
===============================

Mongoose Subdocuments
---------------------

So far all the mongoose models that we've created have been very simple.  In fact, we could of easily created them in MySQL or any other relational database.  Let's see makes MongoDB so powerful and different.

Let's say that we needed to create an application that stored orders and order lines.  In a traditional database, we would need two tables: `orders` and `orderLines`.

With Mongoose we can do this with one model:

```js
{
	customer: {				// customer is a nested object
		name: String,
		email: String,
		address: String
	},
	orderDate: Date,		// Note that we save Date objects
	shipped: Boolean,		// We can save boolean as well
	lines: [{				// lines is an array of objects with the structure below
		sku: String,
		qty: Number,
		price: Number
	}],
	orderTotal: Number
}
```

What would a document that fit this model look like?

```js
{
	_id: ObjectId('577ef65a42bb58d396c8a8a'),
	customer: {
		name: 'Frank',
		email: 'frank@example.com',
		address: '123 Waldo Lane, Tulsa, OK 74145'
	},
	orderDate: 'Thu Jul 14 2016 14:06:57 GMT-0500 (CDT)',
	shipped: false,
	lines: [{
		sku: 'item1',
		qty: 1,
		price: 20
	},{
		sku: 'item2',
		qty: 5,
		price: 4
	}],
	orderTotal: 40
}
```

Any Javascript type (except `function`) can used in mongoose models and saved into mongo documents.

What if we also wanted to store information (such as qty available, price, cost, warehouse location, etc) about the inventory items?  Putting that information with each order is a bad idea, we need a separate model for that.  Let's create an `items` model:

```js
{
	sku: String,
	name: String,
	desc: String,		
	cost: Number,
	price: Number,
	qtyAvail: Number,
	location: String,	// Warehouse location or shelf Number
}
```
This is what a document would look like:

```js
{
	_id: ObjectId('577ef65dcc2bb58d396c80e6'),
	sku: 'item1',
	name: 'Blue Widget',
	desc: 'The finest in widget quality lorem ipsum',
	cost: 2.50,
	price: 20,
	qtyAvail: 999,
	location: 'Way in the back'
}
```

Notice that MongoDB automatically adds `_id` to every document and subdocument, this is to make sure it can uniquely identify each document.

We can use this `_id` to create references between models.  Our `orders` model will now look like this:
```js
{
	customer: {				// customer is a nested object
		name: String,
		email: String,
		address: String
	},
	orderDate: Date,		// Note that we save Date objects
	shipped: Boolean,		// We can save boolean as well
	lines: [{				// lines is an array of objects with the structure below
		item: {type:mongoose.Schema.Types.ObjectId, ref:'Item'},		// Create a reference to the Item model
		qty: Number,
		price: Number
	}],
	orderTotal: Number
}
```

Population
----------
Now that we have references between our models, we can populate them!  Populating a reference means converting it's original ObjectId into a nested object.

To populate the the `item` field in each element of our `lines` array:
```js
Order.find().populate('lines.item').exec().then(function(orders) {		// We find(), then we populate(), then we exec()
	...
});
```
