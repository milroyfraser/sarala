import Post from './dummy/models/Post';
import Tag from './dummy/models/Tag';
import {
    Post as ApiPost,
    Tag as ApiTag
} from './dummy/data/json-api-responce';

describe('api requests', () => {
    test('saving new object without an id should make a post to resource endpoint', async () => {
        const post = new Post();
        post.title = 'Article evident arrived express highest men did boy.';
        post.subtitle = 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.';
        await post.save();

        expect(post.testApiRequest).toEqual({
            'data': {
                'data': {
                    'attributes': {
                        'title': 'Article evident arrived express highest men did boy.',
                        'subtitle': 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.',
                    },
                    'type': 'posts'
                }
            },
            'method': 'POST',
            'url': 'https://sarala-demo.app/api/posts/'
        });
    });

    test('saving pre hydrated object with an id should make a put to resource endpoint', async () => {
        const post = new Post();
        post.testApiResponse = ApiPost;

        let result = await post.find(1);

        result.title = 'Article evident arrived express highest men did boy.';
        result.subtitle = 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.';

        await result.save();

        expect(result.testApiRequest).toEqual({
            'data': {
                'data': {
                    'id': '1',
                    'type': 'posts',
                    'attributes': {
                        'slug': 'voluptates-laborum-non-voluptatem-ducimus-veniam-et',
                        'title': 'Article evident arrived express highest men did boy.',
                        'subtitle': 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.',
                        'body': 'Est quod itaque suscipit quidem dolor dolores velit. Nihil voluptas placeat ex consequatur quasi.\n\nEst nulla cupiditate ad beatae rerum veritatis vel. Quia ut doloribus consequatur porro. Eligendi sit et dignissimos qui voluptatem magnam mollitia labore.\n\nLibero saepe praesentium et sed. Exercitationem error rerum sit inventore provident laborum. Fuga pariatur dolor reiciendis. Quibusdam corrupti commodi ut quo non laboriosam quia. Nihil sit iste sit optio voluptas repellendus exercitationem.',
                        'published_at': '2018-01-25 00:00'
                    }
                }
            },
            'method': 'PUT',
            'url': 'https://sarala-demo.app/api/posts/1'
        });
    });
});