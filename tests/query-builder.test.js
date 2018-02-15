import Post from './dummy/models/Post';

describe('query builder', () => {
    test('all', async () => {
        const post = new Post();
        post.testApiResponse = {};
        await post.all();

        expect(post.testApiRequest).toEqual({
            method: 'GET',
            url: 'https://sarala-demo.app/api/posts/'
        });
    });

    test('find', async () => {
        const post = new Post();
        post.testApiResponse = {};
        await post.find(1);

        expect(post.testApiRequest).toEqual({
            method: 'GET',
            url: 'https://sarala-demo.app/api/posts/1'
        });
    });

    test('with', async () => {
        const post = new Post();
        post.testApiResponse = {};
        await post.with(['tags', 'author', 'comments.author']).find(1);

        expect(post.testApiRequest).toEqual({
            method: 'GET',
            url: 'https://sarala-demo.app/api/posts/1?include=tags,author,comments.author'
        });
    });

    test('paginate', async () => {
        const post = new Post();
        post.testApiResponse = {};
        await post.paginate(4, 1);

        expect(post.testApiRequest).toEqual({
            method: 'GET',
            url: 'https://sarala-demo.app/api/posts/?page[size]=4&page[number]=1'
        });
    });

    test('chain filters with paginate', async () => {
        const post = new Post();
        post.testApiResponse = {};
        await post.with(['tags', 'author', 'comments.author']).paginate(4, 1);

        expect(post.testApiRequest).toEqual({
            method: 'GET',
            url: 'https://sarala-demo.app/api/posts/?include=tags,author,comments.author&page[size]=4&page[number]=1'
        });
    });
});