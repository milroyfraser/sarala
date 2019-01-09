<p align="center"><p align="center"><img src="https://milroy.me/img/sarala-logo.svg" width="200"></p></p>

<p align="center">
    <a href="https://github.com/milroyfraser/sarala/blob/master/LICENSE">
      <img src="https://img.shields.io/apm/l/vim-mode.svg" />
    </a>  
    <a href="https://travis-ci.org/milroyfraser/sarala">
      <img src="https://travis-ci.org/milroyfraser/sarala.svg?branch=master" />
    </a>
    <a href='https://coveralls.io/github/milroyfraser/sarala'>
        <img src='https://coveralls.io/repos/github/milroyfraser/sarala/badge.svg' alt='Coverage Status' />
    </a>   
</p>

# Sarala JS

> Javascript library to communicate with RESTful API built following JSON API specification. inspired by Laravel’s Eloquent

### [API Documentation](https://sarala-io.github.io/sarala-js-docs/guide/) | [Background Story](https://milroy.me/posts/sarala-laravel-eloquent-like-javascript-orm-to-communicate-with-json-api/1)

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
import Tag from './Tag';

export default class Post extends Model {
    resourceName () {
        return 'posts';
    }

    fields () {
        return ['title', 'subtitle', 'body', 'slug'];
    }

    relationships () {
        return {
            tags: new Tag()
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

// makes a GET request to https://sarala-demo.app/api/posts
const fetchAllPosts = async () => {
    let posts = await post.with(['tags']).all();
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

### [API Documentation](https://sarala-io.github.io/sarala-js-docs/guide/) | [Background Story](https://milroy.me/posts/sarala-laravel-eloquent-like-javascript-orm-to-communicate-with-json-api/1)
