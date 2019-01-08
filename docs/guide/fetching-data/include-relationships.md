---
sidebarDepth: 0
---

## Include Relationships

#### Include relationships with resource collection

```javascript
const post = new Post()
let result = await post.with(['tags', 'author', 'comments.author']).get()

// ...
```

```
GET /posts?include=tags,author,comments.author
Accept: application/vnd.api+json
```

#### Include relationships with single resource

```javascript
const post = new Post()
let result = await post.with(['tags', 'author', 'comments.author']).find(8)

// ...
```

```
GET /posts/8?include=tags,author,comments.author
Accept: application/vnd.api+json
```
