Homework for Thursday, July 7th (Due July 11th)
===============================================

Blog Project: Edit Support
--------------------------
At this point your Blog project should be using MongoDB (via `mongoose`) and be committed to github.  I would like you to add the ability to edit blog posts.  See the [*hitList*](https://github.com/sergei202/okcoders-class/tree/master/week5/examples/hitList) example we did in class for a refresher.

Deleting a Mongoose Document
----------------------------
We covered editing documents Thursday but we did not get to deleting documents.

Recall that to update a document:
```js
Model.findOneAndUpdate({_id:doc._id}, doc).exec()
```

Deleting (or removing) is very similar:
```js
Model.findOneAndRemove({_id:doc._id}).exec()
```

**Merits will be given out to anyone who adds both edit and remove support to their Blog project!**
