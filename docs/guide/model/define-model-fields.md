---
sidebarDepth: 0
---

## Define Model Fields

`fields` method should specify which fields to be hydrated to the model. Sarala expects `fields` method to return a `Srting` `Array`. This array should exclude [date fields](#define-date-fields):

```javascript
import Model from './BaseModel'

export default class Post extends Model {

    // ..

    fields () {
        return ['title', 'subtitle', 'body', 'slug']
    }

    // ..
}
```

```javascript
import Post from 'app/models/Post'

const post = new Post()
let thePost = await post.find(8)

console.log(thePost.title) // This is an awesome post. 
```
