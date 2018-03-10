import Model from './BaseModel';
import User from './User';

export default class Comment extends Model {
    resourceName () {
        return 'comments';
    }

    fields () {
        return ['body'];
    }

    dates () {
        return {
            created_at: 'YYYY-MM-DD'
        };
    }

    relationships () {
        return {
            author: new User()
        };
    }

    computed () {
        return {
            full_date (post) {
                return post.created_at.format('MMMM Do YYYY');
            },

            human_date (post) {
                return post.created_at.fromNow();
            }
        };
    }
}