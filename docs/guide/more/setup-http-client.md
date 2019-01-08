---
sidebarDepth: 0
---

## Setup HTTP Client

Sarala lets you use HTTP client of your choice by implementing `request` method on the model. `request` method will receive request config `json object` as the only parameter and it should return a Promise:

#### [axios](https://github.com/axios/axios) for laravel artisans ;)

```javascript
import { Model } from 'sarala'
import axios from 'axios'

export default class Post extends Model
{
    request (config) {
        return axios.request(config)
    }
    
    // ...
}
```

#### [fetch api](https://github.github.io/fetch/)  for legends :D

```javascript
import { Model } from 'sarala'

export default class Post extends Model
{
    request ({ url, method, data, headers }) {
        return fetch(url, {
            method,
            body: data,
            headers
        })
    }
    
    // ...
}
```
