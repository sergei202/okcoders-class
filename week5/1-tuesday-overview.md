Overview for Tuesday, July 5th
==============================

MongoDB
-------
MongoDB is a NoSQL database.  Why are we using it versus something like MySQL?  Because Mongo allows us to store and query records (called *documents*) as JSON objects.  This is incredibly powerful when used with Node and Angular.

Please read this [MongoDB tutorial](http://www.tutorialspoint.com/mongodb/index.htm)
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
	sku: String,			// We list properties and their types
	name: String,			// 'name' is always a string
		price: Number,		// 'price' and 'qty' are always numbers
	qty: Number
});

var catFood = new Item({			// Create a new item using the same properties that we used before
	sku: '80334',
	name: 'Cat Food',
	price: 8.99,
	qty: 15
});

var p = catFood.save();				// We just have to save() our document to save it into MongoDB.
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

What if we wanted to find a specific item and decrease the quantity by one?
```js
Item.findOne({sku:'80334'}).exec().then(function(item) {		// Find one item that has a sku of '80334'
	if(!item) return console.log('Item not found!');			// Bail out if the item isn't found`
	item.qty--;													// Decrease the qty by one
	return item.save();											// Save the item changes and return a Promise (document.save() always returns a Promise)
});
```

Full Example
------------
Look in `examples/itemsApp` for a full example.  You will need to install `mongoose`, `express`, `body-parser` first (or just run `npm install` if you clone this repo).

This example demonstrates what we learned in class today plus what we learned in the previous weeks:

- Connect mongoose to our local mongodb server and specify a database
- Define a model (with schema) in `models/item.js`
- Import our item model using `require()`
- Create an express application using `express()`
- Use `express.static()` to serve static content from `public/`
- Use `bodyParser()` to parse POST requests
- Add route handlers for `/items` (GET and POST handlers)
- Use `Item.find()` to query MongoDB and return all the documents in the `items` collection
- Use `new Item()` to create a new document in the `items` collection
- Use `promise.then()` to run code after asynchronous event

On the client-side (in `index.html`):
- Use the Angular CDN
- Use the Bootstrap CDN
- Create an Angular module (an Angular application)
- Create an Angular controller (`ItemCtrl`)
- Create a bootstrap panel
- Create a bootstrap row/column layout
- Use `ng-model` to bind input fields to `$scope` variables
- Use `ng-click` to run a scope function
- Use `$http.get()` to send a GET request to an express route running on our server
- Use `$http.post()` to send a POST request with an object as the payload
- Use `ng-repeat` to loop through an array
- Use expressions `{{item.name}}` to display scope variables

All of that in just over 100 lines of code!
