---
sidebarDepth: 0
---

## Define Relationships

You may implement `relationships` method on the model to specify its relationships. Sarala expects `relationships` method to return a json object, mapped key to the **relationship name** name and value to the **related model instance**. 

Each key value pair represents a relationship to the model, regardless whether it is one to many, many to many or etc.

```javascript
import Model from './BaseModel'
import Comment from './Comment'
import Tag from './Tag'
import User from './User'

export default class Post extends Model {

    // ..

    relationships () {
        return {
            author: new User(),
            comments: new Comment(),
            tags: new Tag()
        }
    }

    // ..
}
```

```javascript
import Post from 'app/models/Post'

const post = new Post()
let thePost = await post.with(['author', 'tags']).find(8)
```

Relationships you have specified can be retrieve as instance properties.

```
NOTE: relationship property returns a json object: { data, links, meta }
```

##### This model → to One relationship data property will return a model instance.

```javascript
let theAuthor = {}
{ data: theAuthor } = thePost.author

console.log(theAuthor.name) // John Doe
```

##### This model → to Many relationship data property will return an array of model instances.

```javascript
let myTags = []
{ data: myTags } = thePost.tags

console.log(myTags.length) // 3
```

#### You can simply extend Sarala to [return a collection object](/guide/more/collection-pipeline.md) instead :sunglasses:
