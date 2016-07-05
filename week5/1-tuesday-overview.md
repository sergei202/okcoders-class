Overview for Tuesday, July 5th
==============================

MongoDB
-------
MongoDB is a NoSQL database.  Why are we using it versus something like MySQL?  Because Mongo allows us to store and query records (called *documents*) as JSON objects.  This is incredibly powerful when used with Node and Angular.

Please read this [MongoDB tutorial] (tutorialspoint.com)[http://www.tutorialspoint.com/mongodb/index.htm]
to at least deleting documents.


MongoDB: Verify Installation
----------------------------
Check and make sure you that MongoDB is installed and running by typing `mongo` in the shell:
```shell
sergei@sleekbook:~$ mongo
MongoDB shell version: 3.2.7
connecting to: test
>
```
Type `quit()` to exit.  If you received a *command not found* error, check and make sure you installed MongoDB correctly following the instructions for your OS: [OK Coders Prep Guide](https://github.com/sergei202/okcoders-backend/blob/master/00-preparation/README.md).

If you can run the command but get a `exception: connect failed` message, that means `mongod` is not running, google how to start it on your OS.


MongoDB: Crash Course
---------------------
Let's create a simple collection to store inventory items.  We'll use the default `test` database, call our new collection `items`.  In the mongo shell:
```shell
use test;
db.createCollection('items');
```
The first line is just to make sure we are using the `test` database.  The second creates a new collection called `items`.

Let's insert a new *document* (a record in NoSQL terminology).  Our document will be this in JSON:
```js
{
	sku: '80334',
	name: 'Cat Food',
	price: 8.99,
	qty: 15
}
```

We can insert a new document using the `insert` command: `db.collection.insert(jsonObject)`
```js
db.items.insert({sku:'80334', name:'Cat Food', price:8.99, qty:15});
```
You should get `WriteResult({ "nInserted" : 1 })` in response.

We can see all the documents in a collection using the `find` command: `db.collection.find()`
```js
db.items.find();
```
We see something like this returned:
```js
{ "_id" : ObjectId("577b2389d1025f0e0de409ef"), "sku" : "80334", "name" : "Cat Food", "price" : 8.99, "qty" : 15 }
```

Mongoose
----------
Working with MongoDB in Node can be a little cumbersome ([view this example](https://github.com/mongodb/node-mongodb-native) if you don't believe me).  Intead of working directly with MongoDB, we are going to let *Mongoose* do it for us.  [Mongoose](http://mongoosejs.com) is a MongoDB middleware that allows us to abstract *models*.  Models allow us to work with documents through a schema (a specific structure).  Let's see the above *items* example with Mongoose:

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

var catFood = new Item({		// Create a new item using the same properties that we used before
	sku: '80334',
	name: 'Cat Food',
	price: 8.99,
	qty: 15
});

var p = catFood.save();	// We just have to save() our document to save it into MongoDB.
p.then(function(doc) {
	console.log('catFood saved successfully: %j', doc);
}, function(error) {
	console.log('catFood save error: %j', error);
});
```
This may at first look like more work but there is a lot of power it provides.  Let's see how to list everything in the `items` collection:

```js
Item.find().exec().then(function(items) {
	console.log('items: %j', items)
});
```

What if we wanted to find a specific item and decrease the quantify by one?
```js
Item.findOne({sku:'80334'}).exec().then(function(item) {		// Find one item that has a sku of '80334'  
	if(!item) return console.log('Item not found!');			// Bail out if the item isn't found`
	item.qty--;													// Decrease the qty by one
	return item.save();											// Save the item changes and return a Promise (document.save() always returns a Promise)
});
```
