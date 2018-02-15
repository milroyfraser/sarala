# sarala

[![codecov](https://codecov.io/gh/milroyfraser/sarala/branch/master/graph/badge.svg)](https://codecov.io/gh/milroyfraser/sarala)

> Javascript library to communicate with RESTful API built following JSON API specification. inspired by Laravel’s Eloquent


## Install

```sh
$ npm i sarala --save
```

```sh
$ yarn add sarala
```

# Usage

## Model Implementation

##### app/models/BaseModel.js
```javascript
import { Model } from 'sarala';
import axios from 'axios';

export default class BaseModel extends Model
{
    baseUrl () {
        return 'https://sarala-demo.app/api';
    }

    request (config) {
        return axios.request(config);
    }
}
```

##### app/models/Post.js
```javascript
import Model from './BaseModel';
import Comment from './Comment';
import Tag from './Tag';
import User from './User';

export default class Post extends Model {
    resourceName () {
        return 'posts';
    }

    fields () {
        return ['title', 'subtitle', 'body', 'slug'];
    }

    dates () {
        return ['published_at'];
    }

    relationships () {
        return {
            author: new User(),
            comments: new Comment(),
            tags: new Tag()
        };
    }

    computed () {
        return {
            full_date (post) {
                return post.published_at.format('MMMM Do YYYY');
            },

            human_date (post) {
                return post.published_at.fromNow();
            }
        };
    }
}
```

##### app/models/Tag.js
```javascript
import Model from './BaseModel';

export default class Tag extends Model {
    resourceName () {
        return 'tags';
    }

    fields () {
        return ['name'];
    }
}
```

## Fetching data

##### app/components/MyComponent.js
```javascript
import Post from './../models/Post';

const post = new Post();

// makes a GET request to https://sarala-demo.app/api/posts/{id}
const findPost = async (id) => {
    let post = await post.find(id);
};

// makes a GET request to https://sarala-demo.app/api/posts
const fetchAllPosts = async () => {
    let posts = await post.all();
};

// makes a GET request to https://sarala-demo.app/api/posts/?page[size]=10&page[number]={page}
const paginatePosts = async (page) => {
    let posts = await post.paginate(10, page);
};
```

## Fetching data with relationships

##### app/components/MyComponent.js

```javascript
import Post from './../models/Post';

const post = new Post();

// makes a GET request to https://sarala-demo.app/api/posts/{id}?include=tags,author,comments.author
const findPost = async (id) => {
    let post = await post.with(['tags', 'author', 'comments.author']).find(id);
};
```
You can chain `.with([..]);` method to `.find(1);`, `all()` and `.paginate(10,2);`

## Insert

##### app/components/MyComponent.js
```javascript
import Tag from './../models/Tag';

const tag = new Tag();
tag.name = 'json-api';

// makes a POST request to https://sarala-demo.app/api/tags
tag.save(); 
// or you can directly call tag.create();
```

## Update

##### app/components/MyComponent.js
```javascript
import Tag from './../models/Tag';

let tag = await tag.find(10);
tag.name = 'new tag name';

// makes a PUT request to https://sarala-demo.app/api/tags/10
tag.save();
// or you can directly call tag.update();
```

## Delete

##### app/components/MyComponent.js
```javascript
import Tag from './../models/Tag';

let tag = await tag.find(10);

// makes a DELETE request to https://sarala-demo.app/api/tags/10
tag.delete();
```

TODO:
- Document `post.attach(tag)`, `post.detach(tag)` and `post.sync(tags)`
- Implement Sparse Fieldsets
- Implement Sorting
- Implement Filtering