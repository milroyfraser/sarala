---
sidebarDepth: 0
---

## Example Implementation

Simple blog application use case:

* `User` has many `Post`
* `Post` belongs to a `User`
* `Post` has many `Comment`
* `Comment` belongs to a `Post`
* `Post` has many `Tag`
* `Tag` has many `Post`
* `Comment` belongs to a `User`
* `User` has many `Comment`

### Define a base model
`app/models/BaseModel.js`

To prevent duplicating same logic in every model class, we can implement a base model and extend it on every other model class: 

```javascript
import { Model } from 'sarala'
import axios from 'axios'

export default class BaseModel extends Model
{
    baseUrl () {
        return 'https://api.example.com'
    }

    request (config) {
        return axios.request(config)
    }
}
```

Learn more about [setting up http client](/guide/more/setup-http-client.md)

### Post Model
`app/models/Post.js`

```javascript
import Model from './BaseModel'
import Comment from './Comment'
import Tag from './Tag'
import User from './User'

export default class Post extends Model {

    resourceName () {
        return 'posts'
    }

    fields () {
        return ['title', 'subtitle', 'body', 'slug']
    }

    dates () {
        return {
              published_at: 'YYYY-MM-DD'
        }
    }

    relationships () {
        return {
            author: new User(),
            comments: new Comment(),
            tags: new Tag()
        }
    }

    computed () {
        return {
            full_date (post) {
                return post.published_at.format('MMMM Do YYYY')
            },

            human_date (post) {
                return post.published_at.fromNow()
            }
        }
    }
}
```

### Tag Model
`app/models/Tag.js`

```javascript
import Model from './BaseModel'

export default class Tag extends Model {
    resourceName () {
        return 'tags'
    }

    fields () {
        return ['name']
    }
    
    computed () {
        return {
            label_text (tag) {
                return `#${tag.name}`
            }
        }
    }
}
```

### User Model
`app/models/User.js`

```javascript
import Model from './BaseModel'
import Post from "./Post"

export default class User extends Model {
    resourceName () {
        return 'users'
    }

    fields () {
        return ['name', 'email']
    }

    relationships () {
        return {
            posts: new Post()
        }
    }
}
```

### Comment Model
`app/models/Comment.js`

```javascript
import Model from './BaseModel'
import User from "./User"

export default class Comment extends Model {
    resourceName () {
        return 'comments'
    }

    fields () {
        return ['body']
    }

    dates () {
        return {
            created_at: 'YYYY-MM-DD'
        }
    }

    relationships () {
        return {
            author: new User()
        }
    }

    computed () {
        return {
            full_date (post) {
                return post.created_at.format('MMMM Do YYYY')
            },

            human_date (post) {
                return post.created_at.fromNow()
            }
        }
    }
}
```
