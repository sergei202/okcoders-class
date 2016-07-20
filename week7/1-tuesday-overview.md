Overview for Tuesday, July 19th
===============================

Angular File Organization
-------------------------
So far we have placed all of our javascript code (for our front-end) in `index.html`.  This makes our file large and  harder to find things quickly.

We can move our Javascript into separate files, organized by controller.  We also put them all into a `js/` directory, grouping the same file types together makes finding things easier as our app grows.

After creating our files, we simply reference the new file from `index.html`:

```html
<script type="text/javascript" src="js/MyCtrl.js"></script>
```

We also move our non-controller code (`angular.module()`) into a separate file called `js/app.js`:

```js
angular.module('hitList', ['ui.bootstrap']);
```

Notice that we removed the `var app =` from the line, this means that we can't declare our controllers using `app.controller()`.  We need to use `angular.module()` to get a reference to our app:

```js
angular.module('hitList').controller('BidCtrl', ...);
```

Let's also take this opportunity to organize our html files.  All of these files are *views*, markup that is included using `ng-include` or `ng-view` or from inside a modal.  We move all of these files into a `views/` directory.  This leaves our `public/` directory with just `index.html` inside of it.  After moving the views, don't forget to update the references to them in our code.

Check out [Hit List](https://github.com/sergei202/hitList) for an example file organization.  If you already have it cloned, just checkout `master` and pull in the newest changes:

```bash
# From the hitList directory
git checkout master
git pull
```
