Overview for Thursday, July 7th
===============================

Mongoose Recap
--------------
We've so far learned how to:
- Connect Mongoose to MongoDB
- Define Mongoose Models
- Create a new document
- Save the created document
- Find all the documents in a collection

```js
var mongoose = require('mongoose');					// Dont forget to 'npm install mongoose'
mongoose.Promise = global.Promise;					// Tell mongoose to our ES6 promises

mongoose.connect('mongodb://localhost/test');		// Connect to our local MongoDB instance and use the 'test' database

var Item = mongoose.model('Item', {					// Our Item model has this schema:
	sku: String,		// We list properties and their types
	name: String,		// 'name' is always a string
	price: Number,		// 'price' and 'qty' are always numbers
	qty: Number
});

var myItem = new Item({name:'Ice cream', sku:'icecream', price:9.99, qty:1});		// Create a new document from our Item model
myItem.save().then(function(doc) {									// Save the document.  'doc' will be what is in MongoDB.
	console.log('myItem saved successfully!');
});
```

Updating a Document
-------------------
What if we want to update a document that has already been saved?  Mongoose gives us a few different ways to do this.  The easiest to start with is first finding the document, changing it, then saving it:
```js
Item.findOne({sku:'icecream'}).exec().then(function(item) {		// Find *one* item with sku 'icecream'.  The found document is passed to the Promise.  NULL is passed if the item isn't found.
	if(!item) return Promise.reject('Failed to item!');			// Quick check to make sure the item was found.
	item.qty++;							// Make a change.
	return item.save();					// Save our change and return the Promise. 	
});
```

We can also use the mongoose function `Model.findOneAndUpdate(query,doc)`:
```js
Item.findOneAndUpdate({sku:'icecream'}, {qty:5}).exec().then(function(item) {
	// item is the updated item
});
```

Notice that when we use `findOneAndUpdate()` we don't have access to the document before the update, meaning that we can't do things like increase/decrease the qty.

ngInclude and ngView
--------------------
**TODO**

Hit List
--------
Check out [examples/hitList](https://github.com/sergei202/okcoders-class/tree/master/week5/examples/hitList) for the in-class example we did.  This example covers what we learned Tuesday plus how to load and update an existing record.
