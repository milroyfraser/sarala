import Model from './BaseModel'
import Comment from './Comment'
import User from './User'

export default class PostNoTagRelation extends Model {
    resourceName () {
        return 'posts'
    }

    fields () {
        return ['title', 'subtitle', 'body', 'slug']
    }

    relationships () {
        return {
            author: new User(),
            comments: new Comment()
        }
    }
}
