import Model from './BaseModel'

export default class Tag extends Model {
    resourceName () {
        return 'tags'
    }

    fields () {
        return ['name']
    }
}
