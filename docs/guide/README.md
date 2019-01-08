---
sidebarDepth: 0
---

### Install

### yarn

```bash
$ yarn add sarala
```

### npm

```bash
$ npm i sarala --save
```

### Define Model

```javascript
import { Model } from 'sarala'
import axios from 'axios'

export default class Post extends Model
{   
    baseUrl () {
        return 'https://api.example.com'
    }

    request (config) {
        return axios.request(config)
    }
    
    resourceName () {
        return 'posts'
    }

    fields () {
        return ['title', 'subtitle', 'body', 'slug']
    }
}
```

### Use It

```javascript
import Post from './Post'
// ...
const post = new Post()
const data = await post.find(id)
// ...
console.log(data.slug)
```

