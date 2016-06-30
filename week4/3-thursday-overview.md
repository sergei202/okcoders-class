Overview for Thursday, June 29th
================================

Inventory Total Lines
---------------------
WIP.


Angular `$http` Service
-----------------------

Today we are going to learn about the `$http` service!  It allows us to make Ajax requests, just like `$.get()` did in jQuery.

Angular services need to be injected into our controller, just like we did with the `$scope` service:
```js
angular.module('app').controller('MainCtrl', function($scope,$http) {		// We are injecting the $scope and $http services into our controller called MainCtrl
	var promise = $http.get('/ping');		// Send a GET request to /ping.  Returns a Promise that we assign to 'promise'
	promise.then(httpSuccess,httpError);	// Tell our promise to call httpSuccess on success, and httpError on error.

	function httpSuccess(response) {		// response contains our data, headers, and status code.
		console.log('httpSuccess response: ', response);
	}
	function httpError(response) {
		console.log('httpError response: ', response);
	}
});
```
Promises are just fancy ways to handle callbacks.  We'll use them quite a bit on class,
but for now you just need to know that a `$http` Promise has a `then(successFunc,errorFunc)` method that runs the callbacks you pass (only one, `success` when it succeeds, or `error` when it fails).  If you are interested in learning more about Promises, check out this [great tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/).

Check out the full example in `examples/angularHttp/public/ping.html`.
Note: You will have to run `npm install` in `angularHttp/` before running `node server.js`.

Our `$http.get()` and Promise handlers are usually all done inline:
```js
$http.get('/ping').then(function(response) {		// GET /ping and upon success call the first anonymous function
	console.log('success response: ', response);
}, function(error) {								// Call this anonymous function on error
	console.log('error response: ', response);
});
```
This is equivalent to the first example.  We will be using the inline form in class.
See `uptime.html` for an example of this.


POST requests with `$http.post()`
---------------------------------
WIP.
