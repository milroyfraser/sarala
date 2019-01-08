## Clone

Sometimes you may need to make a clone from a model instance. You can easily make a deep clone instance by calling models `clone` method.

```javascript
let postEight = await post.with(['tags', 'author']).find(8)
let colnedPost = postEight.clone()
```

