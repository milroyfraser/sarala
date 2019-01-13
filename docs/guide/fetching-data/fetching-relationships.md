---
sidebarDepth: 0
---

## Fetching Relationships (Lazy Eager Loading)

You can call the `fetch` method of the relationship property to fetch relationship data. It uses self link of [relationship link](https://jsonapi.org/format/#document-resource-object-relationships) object.

`fetch` method is returning a promise at the same time it is updating the model relation property.

```javascript
const post = new Post()
let postEight = await post.find(8)
let postEightTags = await postEight.tags.fetch()

// ...
```

```
GET /posts/1/relationships/tags
Accept: application/vnd.api+json
```

#### Overriding the relationship Url

Sometimes you may need to override the relationship format. You may do it by overriding `getRelationshipUrl` method on the model:

```javascript
import { Model } from 'sarala'

export default class BaseModel extends Model
{
    // ...
    
    getRelationshipUrl (relationship) {
        return `${this.getSelfUrl()}/${relationship}`
    }
    
    // ...
}
```

```
GET /posts/1/tags
Accept: application/vnd.api+json
```
