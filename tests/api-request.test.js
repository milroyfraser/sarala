import {
    Post as ApiPost,
    PostAuthor as ApiPostAuthor,
    PostTags as ApiPostTags,
    PostWithAllNesterRelations as ApiPostWithAllNesterRelations,
    PostWithAllNesterRelationsWithoutSelfLink as ApiPostWithAllNesterRelationsWithoutSelfLink,
    Tag as ApiTag
} from './dummy/data/json-api-responce'
import moxios from 'moxios'
import moment from 'moment'
import User from './dummy/models/User'
import Post from './dummy/models/Post'
import Tag from './dummy/models/Tag'

describe('api requests', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('saving new object without an id should make a post request to resource endpoint', (done) => {
        const post = new Post()
        post.title = 'Article evident arrived express highest men did boy.'
        post.subtitle = 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.'
        post.save()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('post')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                data: {
                    attributes: {
                        title: 'Article evident arrived express highest men did boy.',
                        subtitle: 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.'
                    },
                    type: 'posts'
                }
            }))

            done()
        })
    })

    test('it accepts moment object as date field value', (done) => {
        const post = new Post()
        post.title = 'The day I was born.'
        post.published_at = moment('1989-01-21')
        post.save()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('post')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                data: {
                    attributes: {
                        title: 'The day I was born.',
                        published_at: '1989-01-21 00:00'
                    },
                    type: 'posts'
                }
            }))

            done()
        })
    })

    test('it accepts string value as date field value', (done) => {
        const post = new Post()
        post.title = 'The day I was born.'
        post.published_at = '1989-01-21'
        post.save()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('post')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                data: {
                    attributes: {
                        title: 'The day I was born.',
                        published_at: '1989-01-21 00:00'
                    },
                    type: 'posts'
                }
            }))

            done()
        })
    })

    test('it accepts Date object as date field value', (done) => {
        const post = new Post()
        post.title = 'The day I was born.'
        post.published_at = new Date(1989, 0, 21)
        post.save()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('post')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                data: {
                    attributes: {
                        title: 'The day I was born.',
                        published_at: '1989-01-21 00:00'
                    },
                    type: 'posts'
                }
            }))

            done()
        })
    })

    test('saving pre hydrated object with an id should make a put request to resource endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        result.title = 'Article evident arrived express highest men did boy.'
        result.subtitle = 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.'

        result.save()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('put')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                data: {
                    attributes: {
                        title: 'Article evident arrived express highest men did boy.',
                        subtitle: 'Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.',
                        body: 'Est quod itaque suscipit quidem dolor dolores velit. Nihil voluptas placeat ex consequatur quasi.\n\nEst nulla cupiditate ad beatae rerum veritatis vel. Quia ut doloribus consequatur porro. Eligendi sit et dignissimos qui voluptatem magnam mollitia labore.\n\nLibero saepe praesentium et sed. Exercitationem error rerum sit inventore provident laborum. Fuga pariatur dolor reiciendis. Quibusdam corrupti commodi ut quo non laboriosam quia. Nihil sit iste sit optio voluptas repellendus exercitationem.',
                        slug: 'voluptates-laborum-non-voluptatem-ducimus-veniam-et',
                        published_at: '2018-01-25 00:00'
                    },
                    id: '1',
                    type: 'posts'
                }
            }))

            done()
        })
    })

    test('deleting pre hydrated object should make a delete request to resource endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        result.delete()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('delete')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('attaching another object should make a post request to combined endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        moxios.stubRequest('https://sarala-demo.app/api/tags/1', {
            status: 200,
            response: ApiTag
        })

        const post = new Post()
        let postResult = await post.find(1)

        const tag = new Tag()
        let tagResult = await tag.find(1)

        postResult.attach(tagResult)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('post')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/tags/5')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('attaching another object with pivot date should make a post request to combined endpoint with pivot data', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        moxios.stubRequest('https://sarala-demo.app/api/tags/1', {
            status: 200,
            response: ApiTag
        })

        const post = new Post()
        let postResult = await post.find(1)

        const tag = new Tag()
        let tagResult = await tag.find(1)

        postResult.attach(tagResult, { foo: 'bar', baz: 100 })

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('post')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/tags/5')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                foo: 'bar',
                baz: 100
            }))

            done()
        })
    })

    test('detaching another object should make a delete request to combined endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        moxios.stubRequest('https://sarala-demo.app/api/tags/1', {
            status: 200,
            response: ApiTag
        })

        const post = new Post()
        let postResult = await post.find(1)

        const tag = new Tag()
        let tagResult = await tag.find(1)

        postResult.detach(tagResult)

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('delete')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/tags/5')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('sync relationship should make a put request to combined endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelations
        })

        const post = new Post()
        let postResult = await post.find(1)

        postResult.sync('tags')

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('put')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/tags')
            expect(request.config.headers).toEqual({
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            })
            expect(request.config.data).toEqual(JSON.stringify({
                data: [
                    {
                        type: 'tags',
                        id: '1'
                    },
                    {
                        type: 'tags',
                        id: '15'
                    }
                ]
            }))

            done()
        })
    })

    test('fetch to one relationship should make a get request to combined endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelations
        })

        const post = new Post()
        let postResult = await post.find(1)

        postResult.author.fetch()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/relationships/author')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('fetch to many relationship should make a get request to combined endpoint', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelations
        })

        const post = new Post()
        let postResult = await post.find(1)

        postResult.tags.fetch()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/relationships/tags')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('can fetch to one relationship of even the self link of the relationship is not available', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelationsWithoutSelfLink
        })

        const post = new Post()
        let postResult = await post.find(1)

        postResult.author.fetch()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/relationships/author')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('can fetch to many relationship of even the self links of the relationship is not available', async (done) => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelationsWithoutSelfLink
        })

        const post = new Post()
        let postResult = await post.find(1)

        postResult.tags.fetch()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            expect(request.config.method).toEqual('get')
            expect(request.config.url).toEqual('https://sarala-demo.app/api/posts/1/relationships/tags')
            expect(request.config.headers).toEqual({
                'Accept': 'application/vnd.api+json'
            })

            done()
        })
    })

    test('fetch to one relationship set data properly', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        moxios.stubRequest('https://sarala-demo.app/api/posts/1/relationships/author', {
            status: 200,
            response: ApiPostAuthor
        })

        const post = new Post()
        let postResult = await post.find(1)
        let postAuthor = await postResult.author.fetch()

        expect(postResult.author).toBeInstanceOf(User)
        expect(postResult.author.name).toEqual('Heidi Hintz Jr.')

        expect(postAuthor).toBeInstanceOf(User)
        expect(postAuthor.name).toEqual('Heidi Hintz Jr.')
    })

    test('fetch to many relationship set data properly', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        moxios.stubRequest('https://sarala-demo.app/api/posts/1/relationships/tags', {
            status: 200,
            response: ApiPostTags
        })

        const post = new Post()
        let postResult = await post.find(1)
        let postTags = await postResult.tags.fetch()

        expect(postResult.tags.data.length).toEqual(2)
        expect(postResult.tags.data[0]).toBeInstanceOf(Tag)
        expect(postResult.tags.data[1]).toBeInstanceOf(Tag)

        expect(postTags.data.length).toEqual(2)
        expect(postTags.data[0]).toBeInstanceOf(Tag)
        expect(postTags.data[1]).toBeInstanceOf(Tag)
    })
})
