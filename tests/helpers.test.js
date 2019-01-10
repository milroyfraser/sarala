import Unicorn from './dummy/models/Unicorn'
import Post from './dummy/models/Post'
import {
    PostWithoutLinksAndMeta as ApiPostWithoutLinksAndMeta
} from './dummy/data/json-api-responce'

test('can clone a model', () => {
    const rainbowUnicorn = new Unicorn()
    rainbowUnicorn.color = 'Red'

    expect(rainbowUnicorn.color).toEqual('Red')
    rainbowUnicorn.color = 'Orange'

    const darkUnicorn = rainbowUnicorn.clone()
    darkUnicorn.color = 'Black'

    expect(rainbowUnicorn.color).toEqual('Orange')
    expect(darkUnicorn.color).toEqual('Black')
})

describe('model getSelfUrl', () => {
    test('can get self url', async () => {
        const post = (new Post()).hydrate(ApiPostWithoutLinksAndMeta.data)

        expect(post.getSelfUrl()).toEqual('https://sarala-demo.app/api/posts/1')
    })

    test('it throws error when id is undefined', () => {
        const doDumb = () => {
            (new Post()).getSelfUrl()
        }

        expect(doDumb).toThrow('Sarala: Unidentifiable resource exception. Post id property is undefined.')
    })

    test('it sets self url', () => {
        let post = new Post()
        post.id = 119

        expect(post.getSelfUrl()).toEqual('https://sarala-demo.app/api/posts/119')
        expect(post.links.self).toEqual('https://sarala-demo.app/api/posts/119')
    })
})
