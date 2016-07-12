Overview for Tuesday, July 11th
===============================

ngInclude Directive
---------------------

The `ng-include` directive allows us to include HTML from another file into our main `index.html`.  This allows us to start breaking up one long file into multiple files.  The syntax is simple:  `<div ng-include="'fileToInclude.html'"></div>`.

See the [`ngInclude`](https://github.com/sergei202/okcoders-class/tree/master/week6/examples/ngInclude) example for a full demo.

Note the double-quotes and single-quotes.  This is because `ng-include` expects an *angular expression*, just like a Javascript string isn't valid without quotes, same for an angular expression.

Because it takes an expression, we do pass a scope variable instead of a string.  Let's create a radio button group tied to that scope variable:

```html
<input type="radio" ng-model="filename" value="file1.html"> file1.html<br>
<input type="radio" ng-model="filename" value="file2.html"> file2.html<br>
<input type="radio" ng-model="filename" value="file3.html"> file3.html<br>
...
<div ng-include="filename"></div>			<!-- filename will be whatever option is selected above -->
```

View a full example in [ngIncludeRadio](https://github.com/sergei202/okcoders-class/tree/master/week6/examples/ngIncludeRadio).



ngRoute and ngView
------------------
ngRoute allows us to map a *client-side route* to a specific a specific template (html file) and controller. ngView is the directive where the current view is displayed.

We need to include the ngRoute source after the angular script tag:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>			<!-- Include Angular -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.6/angular-route.min.js"></script>    <!-- Include ngRoute -->
```

ngRoute is an angular module, meaning that will have to reference it in our module to use it:
```js
var app = angular.module('petApp', ['ngRoute']);
```

We need to configure `$routeProvider`:
```js
app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/pet/cat', {                 // Define a route '/pet/cat' that will use cat.html and CatCtrl
			templateUrl: 'cat.html',
			controller: 'CatCtrl'			// We will have to define a controller called CatCtrl for this to work
		})
		.when('/pet/dog', {                 // Define a route '/pet/dog' that will use dog.html and no controller
			templateUrl: 'dog.html'
		})
		.when('/pet/ferret', {                 // Define a route '/pet/ferret' that will use ferret.html and no controller
			templateUrl: 'ferret.html'
		})
		.otherwise('/pet/cat');             // Define the default route as /pet/cat
});
```

Check out the full example in [ngView](https://github.com/sergei202/okcoders-class/tree/master/week6/examples/ngView).  Pay attention to the address bar as you select different pets.


UI Bootstrap
------------

[UI Bootstrap](https://angular-ui.github.io/bootstrap) is a group of angular add-ons that use empower bootstrap.  Some examples:
- [Dynamic Tooltips](https://angular-ui.github.io/bootstrap/#/tooltip)
- [Tabs](https://angular-ui.github.io/bootstrap/#/tabs)
- [Image Carousel](https://angular-ui.github.io/bootstrap/#/carousel)
- [Dropdown Buttons](https://angular-ui.github.io/bootstrap/#/dropdown)
- [Modals](https://angular-ui.github.io/bootstrap/#/modal)

We'll use some of these in class, but we are going to start with modals.

Modals
------

What is a modal?  A modal is like a Javascript `alert()` pop-up but on steriods:
- It is **non-blocking**, meaning your app continues to run while it is open
- It is a full view + controller, meaning you can put anything you want in it
- It supports animations and is completely themeable

Before we can use modals, we need to include the `ui-bootstrap` and `ui-bootstrap-tpls` sources:
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.js"></script>
```
We have to tell our angular module to use the `ui.bootstrap` module:
```js
var app = angular.module('modalApp', ['ui.bootstrap']);            // Define our modalApp module with ui.bootstrap as a dependency
```

We need to inject the `$uibModal` service into our controller and then we can call `$uibModal.open()` to open a modal:
```js
app.controller('ExampleCtrl', function($scope,$uibModal) {
	$uibModal.open({									// Create a modal using a template file
		templateUrl: 'modalBasic.html'					// Note that the property is 'templateUrl' and the value is a filename
	});
});
```

`$uibModal.open()` options also allow us to specify a controller function.  This means that `$uibModal` will automatically inject `ng-controller` for us, allowing us access to `$scope`.

```js
app.controller('ExampleCtrl', function($scope,$uibModal) {
	$uibModal.open({									// Create a modal using a template file
		templateUrl: 'modalList.html',
		controller: function($scope) {					// Define a controller function and inject $scope
			$scope.name = 'Sergei';
			$scope.items = [1,2,3,4,5];
		}
	});
});
```

Play around with the [modalBasic](https://github.com/sergei202/okcoders-class/tree/master/week6/examples/modalBasic) examples.


Modal Result
------------
How can we get a value returned from a modal?  With Promises! Because modals are asynchronous, `$uibModal.open()` returns an object with a `result` property that is a Promise.
Let's see this in action:

```js
app.controller('ExampleCtrl', function($scope,$uibModal) {
	var modalInstance = $uibModal.open({									// Create a modal using a template file
		templateUrl: 'modalList.html',
		controller: function($scope,$uibModalInstance) {					// Define a controller function and inject $scope and uibModalInstance
			$scope.name = 'Sergei';
			$scope.items = [1,2,3,4,5];
			$scope.close = function() {
				$uibModalInstance.close($scope.items);						// result Promise will resolve to $scope.items
			};
		}
	});
	modalInstance.result.then(function(items) {			// Promise is resolved to whatever is passed to $uibModalInstance.close()
		console.log('items = ', items);
	});
});
```
