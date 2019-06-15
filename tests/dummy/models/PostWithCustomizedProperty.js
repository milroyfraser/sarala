import Post from './Post'

export default class PostWithCustomizedProperty extends Post {
    constructor () {
        super()

        this.metadata = []
    }
}
