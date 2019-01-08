---
sidebarDepth: 0
---

#### Create

```javascript
const post = new Post()
post.title = 'Title of the post'
post.subtitle = 'Subtitle of the post'

post.save() // or post.create()

// ...
```

```
POST /posts
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
    data: {
        attributes: {
            title: 'Title of the post',
            subtitle: 'Subtitle of the post',
        },
        type: 'posts'
    }
}
```

#### Update

```javascript
let tagTen = await tag.find(10)
tagTen.name = 'new tag name'

tagTen.save() // or tag.update()

// ...
```

```
PUT /tags/10
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
    data: {
        attributes: {
            name: 'new tag name'
        },
        type: 'tags'
    }
}
```

#### Delete

```javascript
let tagTen = await tag.find(10)

tagTen.delete()

// ...
```

```
DELETE /tags/10
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json
```
