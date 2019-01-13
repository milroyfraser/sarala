import {
    PostWithAllNesterRelations as ApiPost,
    PaginatedPostsListWithAllNesterRelations as ApiPostsList
} from './dummy/data/json-api-responce'
import moment from 'moment'
import User from './dummy/models/User'
import Post from './dummy/models/Post'
import Tag from './dummy/models/Tag'
import moxios from 'moxios'

describe('reading model', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('fields', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        expect(result.id).toEqual(ApiPost.data.id)
        expect(result.type).toEqual(ApiPost.data.type)
        expect(result.title).toEqual(ApiPost.data.attributes.title)
    })

    test('date fields', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        expect(moment.isMoment(result.published_at)).toBeTruthy()
        expect(result.published_at.format('YYYY-MM-DD')).toEqual(ApiPost.data.attributes.published_at)
    })

    test('computed fields', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        expect(result.full_date).toEqual('January 25th 2018')
    })

    test('relationships', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        expect(result.author).toBeInstanceOf(User)
        expect(result.tags.data.length).toEqual(2)
        expect(result.tags.data[0]).toBeInstanceOf(Tag)
    })

    test('links', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/1', {
            status: 200,
            response: ApiPost
        })

        const post = new Post()
        let result = await post.find(1)

        expect(result.links).toEqual({
            self: 'https://sarala-demo.app/api/posts/1'
        })
    })
})

describe('reading collection', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('meta and links', async () => {
        moxios.stubRequest('https://sarala-demo.app/api/posts/?include=tags,author,comments.author&page[size]=4&page[number]=1', {
            status: 200,
            response: ApiPostsList
        })

        const post = new Post()
        let result = await post.with(['tags', 'author', 'comments.author']).paginate(4, 1)

        expect(result.links).toEqual({
            first: "https://sarala-demo.app/api/posts?=1",
            last: "https://sarala-demo.app/api/posts?=3",
            next: "https://sarala-demo.app/api/posts?=2",
            self: "https://sarala-demo.app/api/posts?=1"
        })

        expect(result.meta).toEqual({
            pagination: {
                count: 4,
                current_page: 1,
                per_page: 4,
                total: 10,
                total_pages: 3
            }
        })

        expect(result.data.length).toEqual(4)
        expect(result.data[0]).toBeInstanceOf(Post)
    })
})
