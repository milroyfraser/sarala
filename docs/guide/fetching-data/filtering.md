---
sidebarDepth: 0
---

## Filtering

#### Apply a filter without a parameter

```javascript
const post = new Post()
let result = await post.orderBy('published_at').all()

// ...
```

```
GET /posts?filter[archived]
```

#### Apply parameterised filters

```javascript
const post = new Post()
let result = await post.where('published-before', '2018-01-01').all()

// ...
```

```
GET /posts?filter[published-before]=2018-01-01
```

#### Filter Groups

Sometimes you may need to apply more complex filter queries. So you can group filter queries by passing the third parameter as the group name to the `where` method.

```javascript
const post = new Post()
let result = await post.where('published-before', '2018-01-01', 'unicorn')
.where('likes-above', 100, 'unicorn')
.all()

// ...
```

```
GET /posts?filter[unicorn][published-before]=2018-01-01&filter[unicorn][likes-above]=100
```
