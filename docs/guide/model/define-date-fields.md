---
sidebarDepth: 0
---

## Define Date Fields

You may specify which fields to be converted to [moment](https://momentjs.com/docs/) objects by implementing `dates` method on the model. Sarala expects `dates` method to return an json object mapped key to the **field name** and value to the **date time format** should be serialized to before sending to API. The format String should follow [momentjs formatting guidelines](https://momentjs.com/docs/#/parsing/string-format/).:

```javascript
import Model from './BaseModel'

export default class Post extends Model {

    // ..

    dates () {
        return {
            published_at: 'YYYY-MM-DD'
        }
    }

    // ..
}
```

```javascript
import Post from 'app/models/Post'

const post = new Post()
let thePost = await post.find(8)

console.log(thePost.published_at.format('YYYY-MM-DD')) // 2018-01-21
```
