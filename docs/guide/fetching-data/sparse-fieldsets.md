---
sidebarDepth: 0
---

## Sparse Fieldsets

#### Specify only root resource fields

```javascript
const post = new Post()
let result = await post.select(['title', 'subtitle']).find(8)

// ...
```

```
GET /posts?fields[posts]=title,subtitle
```

#### Specify fields of root and related resources

```javascript
const post = new Post()
let result = await post.select({
    posts: ['title', 'subtitle'],
    tags: ['name']
}).with(['tags']).find(8)

// ...
```

```
GET /posts?include=tags&fields[posts]=title,subtitle&fields[tags]=name
```
