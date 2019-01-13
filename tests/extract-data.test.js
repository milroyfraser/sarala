import {
    Post as ApiPost,
    PostWithAllNesterRelations as ApiPostWithAllNesterRelations
} from './dummy/data/json-api-responce'
import moxios from 'moxios'
import Post from './dummy/models/Post'

describe('it extracts data from', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('single object', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)
        let data = result.data()

        expect(data.id).toEqual(ApiPost.data.id)
        expect(data.type).toEqual(ApiPost.data.type)
        expect(data.title).toEqual(ApiPost.data.attributes.title)
        expect(data.subtitle).toEqual(ApiPost.data.attributes.subtitle)
        expect(data.body).toEqual(ApiPost.data.attributes.body)
        expect(data.published_at).toEqual(ApiPost.data.attributes.published_at + ' 00:00')
    })

    test('single object with relations', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelations
        })

        const post = new Post()
        let result = await post.find(1)
        let data = result.data()

        expect(data.id).toEqual(ApiPost.data.id)
        expect(data.type).toEqual(ApiPost.data.type)
        expect(data.title).toEqual(ApiPost.data.attributes.title)
        expect(data.subtitle).toEqual(ApiPost.data.attributes.subtitle)
        expect(data.body).toEqual(ApiPost.data.attributes.body)
        expect(data.published_at).toEqual(ApiPost.data.attributes.published_at + ' 00:00')

        expect(data.relationships).toEqual(['author', 'tags', 'comments'])

        expect(data.author.data.id).toEqual('1')
        expect(data.author.data.type).toEqual('users')
        expect(data.author.data.name).toEqual('Heidi Hintz Jr.')

        expect(data.comments.data_collection).toBeTruthy()
        expect(data.comments.data.length).toEqual(2)
        expect(data.tags.data_collection).toBeTruthy()
        expect(data.tags.data.length).toEqual(2)
    })
})
