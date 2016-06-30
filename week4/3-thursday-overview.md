Overview for Thursday, June 29th
================================

Inventory Total Lines
---------------------

Angular `$http` Service
-----------------------

Today we are going to learn about the `$http` service!  It allows us to make Ajax requests, just like `$.get()` did in jQuery.

Angular services need to be injected into our controller, just like we did with the `$scope` service:
```js
angular.module('app').controller('MainCtrl', function($scope,$http) {		// We are injecting the $scope and $http services into our controller called MainCtrl
	var promise = $http.get('/ping');		// Send a GET request to /ping.  Notice that we don't have a callback function, instead we have something called a Promise returned.
	promise.then(function(response) {		// Our promise will call whatever callback function we pass to then() when it succeeds.
		console.log('/ping returned: ', response);
	});
});
```
Promises are just fancy ways to handle callbacks.  We'll use them quite a bit on class,
but for now you just need to know that a `$http` Promise has a `then(success,error)` method that runs the callbacks you pass (only one, `success` when it succeeds, or `error` when it fails).

If you are interested in learning more about Promises, check out this [great tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/).
