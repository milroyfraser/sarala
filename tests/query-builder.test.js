import moxios from 'moxios'
import Post from './dummy/models/Post'

describe('query builder', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('all', (done) => {
        const post = new Post()
        post.all()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('find', (done) => {
        const post = new Post()
        post.find(1)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('with', (done) => {
        const post = new Post()
        post.with(['tags', 'author', 'comments.author']).find(1)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1?include=tags,author,comments.author')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('paginate', (done) => {
        const post = new Post()
        post.paginate(4, 2)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?page[size]=4&page[number]=2')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    describe('sorting', () => {
        test('orderBy', (done) => {
            const post = new Post()
            post.orderBy('published_at').all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?sort=published_at')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('orderByDesc', (done) => {
            const post = new Post()
            post.orderByDesc('published_at').all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?sort=-published_at')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('chain sort methods', (done) => {
            const post = new Post()
            post.orderBy('author.name').orderByDesc('published_at').all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?sort=author.name,-published_at')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('it throws error for invalid sort directions', () => {
            const doDumb = () => {
                const post = new Post()
                post.orderBy('author.name', 'crap')
            }

            expect(doDumb).toThrow('Sarale: Invalid sort direction: "crap". Allowed only "asc" or "desc".')
        })
    })

    describe('sparse fields', () => {
        test('model fields as an array', (done) => {
            const post = new Post()
            post.select(['title', 'subtitle']).all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?fields[posts]=title,subtitle')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('relationships fields as an object', (done) => {
            const post = new Post()
            post.select({
                posts: ['title', 'subtitle'],
                tags: ['name']
            }).all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?fields[posts]=title,subtitle&fields[tags]=name')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('it throws error for invalid fields', () => {
            const doDumb = () => {
                const post = new Post()
                post.select('crap')
            }

            expect(doDumb).toThrow('Sarala: Invalid fields list.')
        })
    })

    describe('filtering', () => {
        test('filter', (done) => {
            const post = new Post()
            post.filter('archived').all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?filter[archived]')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('where', (done) => {
            const post = new Post()
            post.where('published-before', '2018-01-01').all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?filter[published-before]=2018-01-01')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('where group', (done) => {
            const post = new Post()
            post.where('published-before', '2018-01-01', 'unicorn')
                .where('likes-above', 100, 'unicorn')
                .all()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?filter[unicorn][published-before]=2018-01-01&filter[unicorn][likes-above]=100')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('limit', (done) => {
            const post = new Post()
            post.limit(10).get()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?filter[limit]=10')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('offset', (done) => {
            const post = new Post()
            post.offset(10).get()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?filter[offset]=10')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })

        test('limit and offset', (done) => {
            const post = new Post()
            post.limit(10).offset(20).get()

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                expect(request.config.method).toEqual('get')
                expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?filter[limit]=10&filter[offset]=20')
                expect(request.config.headers).toEqual({
                    'Accept': 'application/vnd.api+json'
                })

                done()
            })
        })
    })

    test('chain filters with paginate', (done) => {
        const post = new Post()
        post.with(['tags', 'author', 'comments.author']).paginate(4, 1)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?include=tags,author,comments.author&page[size]=4&page[number]=1')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('querying from same instance multiple time should not merge request url', (done) => {
        const post = new Post()
        post.with(['tags', 'author', 'comments.author']).paginate(4, 1)
        post.with(['tags', 'author', 'comments.author']).paginate(4, 1)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/?include=tags,author,comments.author&page[size]=4&page[number]=1')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })
})
