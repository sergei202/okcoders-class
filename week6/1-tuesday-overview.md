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


UI Bootstrap and Modals
-----------------------
TODO
