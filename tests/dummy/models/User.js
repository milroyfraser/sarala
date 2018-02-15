import Model from './BaseModel';
import Post from './Post';

export default class User extends Model {
    resourceName () {
        return 'users';
    }

    fields () {
        return ['name', 'email'];
    }

    relationships () {
        return {
            posts: new Post()
        };
    }
}