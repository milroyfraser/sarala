---
sidebarDepth: 0
---

## Introduction

Sarala package provides a eloquent api, inspired by [Laravel Eloquent](https://laravel.com/docs/5.7/eloquent) to working with your REST API implemented following [{json:api} specification](https://jsonapi.org/format/). 

## Implementation

Each API resource has a corresponding "Model" which is used to interact with that resource endpoint and its relations. Models allow you to fetch data, as well as make create, update and delete requests to the REST API.

#### Sarala Model

Now, let's look at an example Post model, which we will use to make requests to the `posts` resource endpoint:

```javascript
import { Model } from 'sarala'

export default class Post extends Model
{
    // ...
}
```

#### Resource Name

Note that we did not tell Sarala which resource name to use for our Post model. You may specify the resource name by implementing `resourceName` method on your model:

```javascript
import { Model } from 'sarala'

export default class Post extends Model
{
    resourceName () {
        return 'posts'
    }
    
    // ...
}
```

#### Base Url

Sarala expects you to specify api base url on every model. You may specify the api base url by implementing `baseUrl` method on your model:

```javascript
import { Model } from 'sarala'

export default class Post extends Model
{
    baseUrl () {
        return 'https://api.example.com'
    }
    
    // ...
}
```
