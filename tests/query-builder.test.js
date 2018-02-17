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

    describe('sorting', () => {
        test('orderBy', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.orderBy('published_at').all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?sort=published_at'
            });
        });

        test('orderByDesc', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.orderByDesc('published_at').all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?sort=-published_at'
            });
        });

        test('chain sort methods', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.orderBy('author.name').orderByDesc('published_at').all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?sort=author.name,-published_at'
            });
        });

        test('it throws error for invalid sort directions', () => {
            const doDumb = () => {
                const post = new Post();
                post.orderBy('author.name', 'crap');
            };

            expect(doDumb).toThrow('Sarale: Invalid sort direction: "crap". Allowed only "asc" or "desc".');
        });
    });

    describe('sparse fields', () => {
        test('model fields as an array', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.select(['title', 'subtitle']).all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?fields[posts]=title,subtitle'
            });
        });

        test('relationships fields as an object', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.select({
                posts: ['title', 'subtitle'],
                tags: ['name']
            }).all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?fields[posts]=title,subtitle&fields[tags]=name'
            });
        });

        test('it throws error for invalid fields', () => {
            const doDumb = () => {
                const post = new Post();
                post.select('crap');
            };

            expect(doDumb).toThrow('Sarala: Invalid fields list.');
        });
    });

    describe('filtering', () => {
        test('filter', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.filter('archived').all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?filter[archived]'
            });
        });

        test('where', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.where('published-before', '2018-01-01').all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?filter[published-before]=2018-01-01'
            });
        });

        test('where group', async () => {
            const post = new Post();
            post.testApiResponse = {};
            await post.where('published-before', '2018-01-01', 'unicorn')
                .where('likes-above', 100, 'unicorn')
                .all();

            expect(post.testApiRequest).toEqual({
                method: 'GET',
                url: 'https://sarala-demo.app/api/posts/?filter[unicorn][published-before]=2018-01-01&filter[unicorn][likes-above]=100'
            });
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