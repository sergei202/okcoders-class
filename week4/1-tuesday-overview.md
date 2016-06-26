Overview for Tuesday, June 27th
===============================

Intro to AngularJS
------------------
AngularJS is a full client-side framework.  It does lots of the DOM heavy-lifting for us, meaning that we won't need to use jQuery anymore.  AngularJS also allows us to easily create *Single Page Applications* (a website/app that doesn't reload the entire page when you navigate). Sites like Facebook and Gmail are SPAs.

Setting up AngularJS
--------------------
As we did we jQuery, we are going to use a CDN for Angular.  Let's create a bare-minimum Angular application:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Minimum AngularJS App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    </head>
    <body ng-app>	<!-- ng-app bootstraps our Angular application -->
        This is an AngularJS Application!
		It does absolutely nothing!
    </body>
</html>
```
Besides the script tag that loads Angular, the only new thing is the `ng-app` directive on the `<body>` tag. `ng-app` tells Angular to bootstrap itself.  Now let's make something happen!

Expressions
-----------
Expressions are a major part of Angular's power.  Expressions are statements surrounded double two braces embedded in HTML:
```
{{1 + 2}}
{{'Hello' + ' ' + 'World!'}}
```

Let's see a full example:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>AngularJS Expressions App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    </head>
    <body ng-app>
        <p>1 + 2 = {{1 + 2}}</p>             <!-- Angular will replace {{1 + 2}} with 3 -->
        <p>{{'Hello' + ' ' + 'World!'}}</p>  <!-- Exprssions work with strings as well -->
        <p>{{[1,2,3,4].join(' and ')}}</p>   <!-- We can also use arrays and call functions -->
    </body>
</html>
```

Let's set some variables using the `ng-init` directive:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>AngularJS Expressions App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    </head>
    <body ng-app ng-init="num1=42; num2=33;">
        <p>{{num1}} + {{num2}} = {{num1 + num2}}</p>
    </body>
</html>
```

We can even set complex variables likes arrays and objects.  We can access them just like we would in Javascript:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>AngularJS Expressions App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    </head>
    <body ng-app ng-init="person = {age:32, firstName:'Bob', lastName:'Smith'}">
        <p>Age: {{person.age}}</p>
        <p>First Name: {{person.firstName}}</p>
        <p>Last Name: {{person.lastName}}</p>
    </body>
</html>
```
We can use the `ng-repeat` directive to loop through an array and dynamically generate DOM elements for us!
```html
<!DOCTYPE html>
<html>
    <head>
        <title>AngularJS Expressions App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    </head>
    <body ng-app ng-init="items=['Laptop','Cell phone','Car key','Wallet']">
        Items to Bring:
        <ul>
            <li ng-repeat="item in items">
                {{item}}
            </li>
        </ul>
    </body>
</html>
```
This example sets `items` to be an array.  We then tell Angular to look through our array using `ng-repeat`, the expression always follows the form: *item* in *collection*, the actual names can be anything you want them to be.  `ng-repeat` will duplicate the DOM element it is on (`<li>`) and set's it's content to *item*.

Form Inputs and `ng-model`
--------------------------
AngularJS makes dealing with form inputs a breeze with `ng-model`.  `ng-model` binds the value of an input to a scope variable (what we use in expressions and what `ng-init` sets).  Let's see a simple example:
```html
<input type="text" ng-model="myName">
My name is {{myName}}
```
Angular automatically creates a `myName` scope variable and keeps it in sync with the input field's value.

Let's see another example, this time we ask for two numbers and display the product:
```html
<input type="number" ng-model="num1">
x
<input type="number" ng-model="num2">
=
{{num1 * num2}}
```

How about buttons?  Angular provides a `ng-click` directive that run expressions, we can use this just like `ng-init` to set scope variables.

```html
<input type="button" value="Red" ng-click="favColor='red'">
<input type="button" value="Green" ng-click="favColor='green'">
<input type="button" value="Blue" ng-click="favColor='blue'">
<p>You like: {{favColor}}</p>
```

Modules and Controllers
-----------------------
Everything we have done so far has been without a single line of 'real' javascript, all the code has been in markup on elements.

Code that interfaces with scope variables (anything that affects what is shown on screen) goes into *controllers*.  A controller is a javascript function where all of our logic that controls our app is stored.

Before we can use any controllers, we need to define an Angular *module*.  Angular modules allow us to bundle controllers, services, directives, etc, all into one app.   Let's see how we define our module:
```js
angular.module('myApp', []);		// Define a module called 'myApp' with no dependences (the empty array is where other module dependences would go)
```
Now that we defined our module, we need to tell Angular use it with our html markup.  We do this by setting `ng-app="myApp"`:
```html
<body ng-app="myApp">
	...
</body>
```
Note that whatever `ng-app` points to needs to be a valid module, otherwise Angular will throw cryptic errors.

Let's see how to define a controller:

```js
angular.module('myApp').controller('HelloCtrl', function($scope) {	// We define a new controller onto our existing myApp module.  This controller is called 'HelloCtrl' and has the $scope service injected into it.
	$scope.myName = 'Sergei';										// $scope is a built-in Angular service that allows us access to scope, where we can use expressions to render things to the user.
});
```

Let's see the code of a full example:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello AngularJS App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
        <script>
            angular.module('myApp', []);        // Define our app module called 'myApp'
            angular.module('myApp').controller('HelloCtrl', function($scope) {  // Define a controller called HelloCtrl
                $scope.myName = 'Sergei';       // Add a few scope properties
                $scope.age = 32;                //
            });
        </script>
    </head>
    <body ng-app="myApp">                   <!-- Tell Angular use the myApp module -->
        <div ng-controller="HelloCtrl">     <!-- Tell Angular to use our HelloCtrl here -->
            <p>My name is {{myName}}</p>    <!-- All of the scope properties we defined for our controller are available here! -->
            <p>I am {{age}} years old</p>
        </div>
        <p>This won't work: {{myName}}</p>  <!-- Note that we can't access the scope properties of HelloCtrl outside of the element it was defined on -->
    </body>
</html>

```

We can also define scope methods (functions) in the same way:
```js
angular.module('myApp').controller('MathCtrl', function($scope) {
	$scope.num1 = 0;
	$scope.num2 = 0;
	$scope.doAdd = function() {						// We can now access this from markup, eg:  'ng-click="doAdd()"'
		$scope.result = $scope.num1 + $scope.num2;
	};
});
```
See the full example in `examples/angular/mathCtrl.html`.
