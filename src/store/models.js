import { uniqueId } from 'lodash'

export const createFeed = (url, title, description) => ({
    id: uniqueId('feed_'),
    url,
    title,
    description
})

export const createPost = (feedId, title, link, description) => ({
    id: uniqueId('post_'),
    feedId, 
    title, 
    link, 
    description
})
