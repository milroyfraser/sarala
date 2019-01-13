import {
    Post as ApiPost,
    PostWithAllNesterRelations as ApiPostWithAllNesterRelations,
    PostWithRelationalLinks as ApiPostWithRelationalLinks,
    PaginatedPostsList as ApiPaginatedPostsList
} from './dummy/data/json-api-responce'
import moxios from 'moxios'
import Post from './dummy/models/Post'
import User from './dummy/models/User'
import Tag from './dummy/models/Tag'
import Comment from './dummy/models/Comment'
import PostNoTagRelation from './dummy/models/PostNoTagRelation'

describe('it hydrates', () => {
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

        expect(result).toBeInstanceOf(Post)
        expect(result.id).toEqual(ApiPost.data.id)
        expect(result.type).toEqual(ApiPost.data.type)
        expect(result.title).toEqual(ApiPost.data.attributes.title)
        expect(result.subtitle).toEqual(ApiPost.data.attributes.subtitle)
        expect(result.body).toEqual(ApiPost.data.attributes.body)
        expect(result.published_at.format('YYYY-MM-DD')).toEqual(ApiPost.data.attributes.published_at)
    })

    test('single object collection with links and meta', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/', {
            status: 200,
            response: ApiPaginatedPostsList
        })

        const post = new Post()
        let result = await post.all()

        expect(result.data.length).toEqual(4)
        expect(result.data[0]).toBeInstanceOf(Post)
        expect(result.links).toEqual(ApiPaginatedPostsList.links)
        expect(result.meta).toEqual(ApiPaginatedPostsList.meta)
    })

    test('single object with relations', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelations
        })

        const post = new Post()
        let result = await post.find(1)

        expect(result).toBeInstanceOf(Post)
        expect(result.id).toEqual(ApiPost.data.id)
        expect(result.type).toEqual(ApiPost.data.type)
        expect(result.title).toEqual(ApiPost.data.attributes.title)
        expect(result.subtitle).toEqual(ApiPost.data.attributes.subtitle)
        expect(result.body).toEqual(ApiPost.data.attributes.body)
        expect(result.published_at.format('YYYY-MM-DD')).toEqual(ApiPost.data.attributes.published_at)

        expect(result.author).toBeInstanceOf(User)
        expect(result.author.name).toEqual('Heidi Hintz Jr.')

        expect(result.tags.data.length).toEqual(2)
        expect(result.tags.data[0]).toBeInstanceOf(Tag)
        expect(result.tags.data[1]).toBeInstanceOf(Tag)
        expect(result.comments.data.length).toEqual(2)
        expect(result.comments.data[0]).toBeInstanceOf(Comment)
        expect(result.comments.data[1]).toBeInstanceOf(Comment)
        expect(result.comments.data[0].author).toBeInstanceOf(User)
        expect(result.comments.data[1].author).toBeInstanceOf(User)
    })

    test('single object with relations without data', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithRelationalLinks
        })

        const post = new Post()
        let result = await post.find(1)

        expect(result).toBeInstanceOf(Post)
        expect(result.id).toEqual(ApiPost.data.id)
        expect(result.type).toEqual(ApiPost.data.type)
        expect(result.title).toEqual(ApiPost.data.attributes.title)
        expect(result.subtitle).toEqual(ApiPost.data.attributes.subtitle)
        expect(result.body).toEqual(ApiPost.data.attributes.body)
        expect(result.published_at.format('YYYY-MM-DD')).toEqual(ApiPost.data.attributes.published_at)

        expect(result.author).toBeUndefined()
        expect(result.tags).toBeUndefined()
    })

    test('should throw an error when relation ship is not defined', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPostWithAllNesterRelations
        })

        const post = new PostNoTagRelation()

        await expect(post.find(1)).rejects.toThrow('Sarale: Relationship tags has not been defined in PostNoTagRelation model.')
    })
})
