---
sidebarDepth: 0
---

## Sorting

#### Ascending

```javascript
const post = new Post()
let result = await post.orderBy('published_at').all()

// ...
```

```
GET /posts?sort=published_at
Accept: application/vnd.api+json
```

#### Descending

```javascript
const post = new Post()
let result = await post.orderByDesc('published_at').all()

// ...
```

```
GET /posts?sort=-published_at
Accept: application/vnd.api+json
```
