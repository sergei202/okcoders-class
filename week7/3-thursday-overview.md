Overview for Thursday, July 21st
================================

Sorting/Filtering/Searching
---------------------------
We can do sorting and filtering/searching either client-side or server-side.

Let's go over some of the highlights of each method:

##### Client-side
- Extremely easy to implement with Angular filters
- Doesn't require any server-side changes or code
- Works great for small datasets (<500 rows)

##### Server-side
- Sorting/filtering is done server-side
- Dataset can be millions of rows
- Pagination is easy to setup


### Client-side Sorting
Angular *filters* (we've already seen the `date` filter) allow us to easily add sorting and filtering to any of our `ng-repeat` directives.

Let's create a fictional dataset and add it to scope.  This is just an array of items, like we would get from our server-side mongo queries.

```js
$scope.items = [
	{id:1,	name:'First Item',		color:'red',	size:'large'},
	{id:2,	name:'Second Item',		color:'green',	size:'small'},
	{id:3,	name:'Third Item',		color:'blue',	size:'medium'},
	{id:4,	name:'Fourth Item',		color:'while',	size:'tiny'},
	{id:5,	name:'Fifth Item',		color:'black',	size:'huge'},
	{id:6,	name:'Sixth Item',		color:'gray',	size:'maximum'},
	{id:7,	name:'Seventh Item',	color:'orange',	size:'minimum'},
	{id:8,	name:'Eighth Item',		color:'purple',	size:'gigantic'},
	{id:9,	name:'Ninth Item',		color:'brown',	size:'pico'},
	{id:10,	name:'Tenth Item',		color:'pink',	size:'nano'}
];
```

Our `ng-repeat` looks like this without sorting or filtering:

```html
<table>
	<tr ng-repeat="item in items">
		<td>{{item.id}}</td>
		<td>{{item.name}}</td>
		<td>{{item.color}}</td>
		<td>{{item.size}}</td>
	</tr>
</table>
```

#### `orderBy` Filter

The `orderBy` filter allows us to sort any array of items by a property of those items.

The format is `orderBy:property:reverse`.  `reverse` is an optional boolean type, setting it `true` reverses the sort direction.

Let's order our example dataset, `$scope.items`, by the `color` property:

```html
<tr ng-repeat="item in items | orderBy:'color'">
```

See [examples/sorting/sorting1.html](https://github.com/sergei202/okcoders-class/tree/master/week7/examples/sorting/sorting1.html) for a example of sorting by a given property.  Play around with different properties.

Notice that the first argument to the `orderBy` filter (colons separate arguments for filters) is in single quotes.  This tells us that it takes an `expression`.  This means we can give it a scope variable instead of hardcoding a value!

Let's add a `<input>` tag that is bound to the scope variable `mySortProp`:

```html
<input ng-model="mySortProp">

<table>
	<tr ng-repeat="item in items | orderBy:mySortProp">
		<td>{{item.id}}</td>
		<td>{{item.name}}</td>
		<td>{{item.color}}</td>
		<td>{{item.size}}</td>
	</tr>
</table>
```

We can now type whatever property we want our table sorted by!  Check out [examples/sorting/sorting2.html](https://github.com/sergei202/okcoders-class/tree/master/week7/examples/sorting/sorting2.html) for an example of this.  Try typing in `id`, `name`, `size`, or `-color`.  Adding a hyphen in front reverses the sort order.

Let's go a step further and give the user a dropdown (a `<select>` box) to pick the sort field and another for the direction:

```html
<select ng-model="sortProp"     ng-options="o.prop as o.label for o in sortProps"></select>
<select ng-model="sortReverse"  ng-options="o.rev  as o.label for o in sortDirs"></select>
...
<tr ng-repeat="item in items | orderBy:sortProp:sortReverse">
```

We'll need to define `sortProps` and `sortDirs` in our controller:

```js
$scope.sortProps = [				// Sort properties that we allow the user to sort by
	{prop:'id',		label:'Sort by ID'},
	{prop:'name',	label:'Sort by Name'},
	{prop:'color',	label:'Sort by Color'},
	{prop:'size',	label:'Sort by Size'}
];
$scope.sortDirs = [					// Sort directions
	{rev:false,	label:'Forwards'},
	{rev:true,	label:'Backwards'}
];
```

See [examples/sorting/sorting3.html](https://github.com/sergei202/okcoders-class/tree/master/week7/examples/sorting/sorting3.html) for an example of the above.

Can we do better?  How about adding table headers and making them clickable!

For this we will add bootstrap and then setup our `<th>`s:

```html
<tr>
	<th><a href ng-click="setSort('id')">ID</a></th>			<!-- Create clickable <a> that calls setSort() with the property we want to sort on -->
	<th><a href ng-click="setSort('name')">Name</a></th>
	<th><a href ng-click="setSort('color')">Color</a></th>
	<th><a href ng-click="setSort('size')">Size</a></th>
</tr>
```

Why are we just not setting `sortProp` directly in the `ng-click`?  Because we want to add logic to reverse the order if you click the same header:

```js
$scope.setSort = function(prop) {
	if($scope.sortProp===prop) {        // If the sort property is already set to prop (meaning we clicked on the same header), reverse the order and return
		$scope.sortReverse = true;
		return;
	}
	$scope.sortProp = prop;
	$scope.sortReverse = false;         // Reset sortReverse to false
};
```

Lastly, let's add some of sort of visual indicator of which property is used for sorting and the direction.  We'll do this with another scope function called `sortIcon()` that will return CSS class glyphicons:

```html
<tr>
	<th><a href ng-click="setSort('id')">ID<span ng-class="sortIcon('id')"></span></a></th>	<!-- ng-class dynamically creates a class attribute with whatever the sortIcon() returns -->
	<th><a href ng-click="setSort('name')">Name<span ng-class="sortIcon('name')"></span></a></th>
	<th><a href ng-click="setSort('color')">Color<span ng-class="sortIcon('color')"></span></a></th>
	<th><a href ng-click="setSort('size')">Size<span ng-class="sortIcon('size')"></span></a></th>
</tr>
```

`sortIcon()`:

```js
$scope.sortIcon = function(prop) {              // Checks to see if prop is the current sort prop and returns a glyph for that sort direction
	if($scope.sortProp!==prop) return null;     // If sortProp isn't prop, return null
	if($scope.sortReverse===false) return 'glyphicon glyphicon-arrow-down';     // If not reversed, show down arrow
	if($scope.sortReverse===true)  return 'glyphicon glyphicon-arrow-up';       // If reversed, show up arrow
};
```
Lastly, let's add column classes on our `<th>`s to prevent them from changing widths when the glyphicon gets moved:

```html
<tr>
	<th class="col-sm-2"><a href ng-click="setSort('id')">ID<span ng-class="sortIcon('id')"></span></a></th>               <!-- ng-class dynamically creates a class attribute with whatever the sortIcon() returns -->
	<th class="col-sm-4"><a href ng-click="setSort('name')">Name<span ng-class="sortIcon('name')"></span></a></th>
	<th class="col-sm-3"><a href ng-click="setSort('color')">Color<span ng-class="sortIcon('color')"></span></a></th>
	<th class="col-sm-3"><a href ng-click="setSort('size')">Size<span ng-class="sortIcon('size')"></span></a></th>
</tr>
```

Check out the final sorting example: [examples/sorting/sorting4.html](https://github.com/sergei202/okcoders-class/tree/master/week7/examples/sorting/sorting4.html).

### Client-side Filtering

Angular provides a `filter` filter that takes a string or object to filter by.  Let's say we want to find all the items that have the string `in` in them:

```html
<tr ng-repeat="item in items | filter:'in'">
```

Because `filter` expects an expression, we can pass a scope variable tied to an `<input>` field instead:

```html
<input class="form-control" ng-model="searchText">
...
<tr ng-repeat="item in items | filter:searchText">
```

See [examples/filtering/filtering1.html](https://github.com/sergei202/okcoders-class/tree/master/week7/examples/filtering/filtering1.html) for an example of the above.

Let's add another property called `category` to our dataset and filter by it using a dropdown:

```js
$scope.categories = ['toys', 'people', 'cities'];		// Define our options for our category dropdown

$scope.items = [
	{id:1,	name:'First Item',		color:'red',	size:'large',		category:'toys'},
	{id:2,	name:'Second Item',		color:'green',	size:'small',		category:'people'},
	{id:3,	name:'Third Item',		color:'blue',	size:'medium',		category:'toys'},
	{id:4,	name:'Fourth Item',		color:'while',	size:'tiny',		category:'people'},
	{id:5,	name:'Fifth Item',		color:'black',	size:'huge',		category:'cities'},
	{id:6,	name:'Sixth Item',		color:'gray',	size:'maximum',		category:'cities'},
	{id:7,	name:'Seventh Item',	color:'orange',	size:'minimum',		category:'people'},
	{id:8,	name:'Eighth Item',		color:'purple',	size:'gigantic',	category:'people'},
	{id:9,	name:'Ninth Item',		color:'brown',	size:'pico',		category:'toys'},
	{id:10,	name:'Tenth Item',		color:'pink',	size:'nano',		category:'toys'}
];
```

```html
<input class="form-control" ng-model="searchObj.$">
<select class="form-control" ng-model="searchObj.category" ng-options="o as o for o in categories"></select>
...
<tr ng-repeat="item in items | filter:searchObj">
```

See [examples/filtering/filtering2.html](https://github.com/sergei202/okcoders-class/tree/master/week7/examples/filtering/filtering2.html) for an example of the above.
