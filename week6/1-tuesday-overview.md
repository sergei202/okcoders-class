Overview for Tuesday, July 11th
===============================

`ngInclude`
-----------
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



`ngView`
--------
TODO


UI Bootstrap and Modals
-----------------------
TODO
