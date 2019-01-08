---
sidebarDepth: 0
---

## Working with Related Resource

#### Created to related resource

```javascript
let postOne = await post.find(1)
let tagTen = await tag.find(10)

await postOne.attach(tagTen)

// ...
```

```
POST /posts/1/tags/10
```

#### Created to related resource with additional (pivot) data

```javascript
let postOne = await post.find(1)
let tagTen = await tag.find(10)

await postOne.attach(tagTen, { priority: 'low' })

// ...
```

```
POST /posts/1/tags/10

{
    data: {
    type: 'tags',
    id: 10,
    attributes: {
      name: 'food',
      priority: 'low'
    }
  }
}
```

#### Deleting related resource

```javascript
let postOne = await post.find(1)
let tagTen = await tag.find(10)

await postOne.detach(tagTen)

// ...
```

```
DELETE /posts/1/tags/10
```

#### Syncing related resource

```javascript
let postOne = await post.find(1)

// ... 
// here you can add or remove tags from posts  
// ...

await postOne.sync('tags')

// ...
```

```
PUT /posts/1/tags

{
  'data': [
    {
      'type': 'tags',
      'id': '20'
    },
    {
      'type': 'tags',
      'id': '21'
    }
  ]
}
```

