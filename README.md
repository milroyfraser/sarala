# sarala

[![codecov](https://codecov.io/gh/milroyfraser/sarala/branch/master/graph/badge.svg)](https://codecov.io/gh/milroyfraser/sarala) [![npm version](https://badge.fury.io/js/sarala.svg)](https://www.npmjs.com/package/sarala) [![apm](https://img.shields.io/apm/l/vim-mode.svg)](https://github.com/milroyfraser/sarala/blob/master/LICENSE)

> Javascript library to communicate with RESTful API built following JSON API specification. inspired by Laravel’s Eloquent

### [Documentation](https://milroy.me/posts/sarala-laravel-eloquent-like-javascript-orm-to-communicate-with-json-api/1)

## Install

```sh
$ npm i sarala --save
```

```sh
$ yarn add sarala
```

# Basic Usage

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

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Learn More: [Documentation](https://milroy.me/posts/sarala-laravel-eloquent-like-javascript-orm-to-communicate-with-json-api/1)