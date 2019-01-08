---
sidebarDepth: 0
---

## Paginate

```javascript
const post = new Post()
let result = await post.paginate(10, 2)

// ...
```

```
GET /posts?page[size]=10&page[number]=2
```
