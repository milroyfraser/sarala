---
sidebarDepth: 0
---

## Collection Pipeline

As there are many collection javascript libraries out there, Sarala does not wrap collection object data with another library. But it is very easy to wrap collection object data with your favorite library by overriding `newCollection` method.

#### [collect.js](https://github.com/ecrmnn/collect.js/) for laravel artisans ;)

```javascript
import { Model } from 'sarala'
import collect from 'collect.js'

export default class BaseModel extends Model
{
    ...

    newCollection (data) {
        return collect(data)
    }
}
```

```javascript
const user = new User()
let users = await user.all()

let youngest = user.data.sortBy('age').first()
```

#### [Lodash](https://lodash.com/docs/) for legends :D

```javascript
import { Model } from 'sarala'
import _ from 'lodash'

export default class BaseModel extends Model
{
    ...

    newCollection (data) {
        return _.chain(data)
    }
}
```

```javascript
const user = new User()
let users = await user.all()

let youngest = user.data.sortBy('age').head().value()
```
