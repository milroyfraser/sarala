---
sidebarDepth: 0
---

## Fetching Resource

#### Fetch All Resources

```javascript
const post = new Post()
let result = await post.all()

// ...
```

```
GET /posts
Accept: application/vnd.api+json
```

##### You can simply extend Sarala to [return a collection object](/guide/more/collection-pipeline.md) instead :sunglasses:

#### Fetch Single Resource

```javascript
const post = new Post()
let result = await post.find(8)

// ...
```

```
GET /posts/8
Accept: application/vnd.api+json
```
