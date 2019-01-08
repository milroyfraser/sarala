---
sidebarDepth: 0
---

## Define Computed Fields

If your model instance needs any **non-reactive**/**static** properties to be computed, you can specify it by implementing `computed` method on the model. Sarala expects `computed` method to return json object mapped key to the **field name** and value as a **function** expecting model instance as the only parameter:

```javascript
import Model from './BaseModel'

export default class Tag extends Model {

    // ..

    computed () {
        return {
            label (tag) {
                return `#${tag.name}`
            }
        }
    }

    // ..
}
```

```javascript
import Tag from 'app/models/Tag'

const tag = new Tag()
let fooTag = await tag.find('foo')

console.log(fooTag.label) // #foo
```
