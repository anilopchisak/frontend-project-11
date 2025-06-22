import { fetchRSS } from '../http/api.js'
import { FORM_STATUS } from '../utils/consts.js'
import createValidator from '../models/validate.js'
import parseRSS from '../models/parser.js'
import { createFeed, createPost } from '../store/models.js'

export default (state, elements, t) => {
    const { input, form } = elements
    const validateUrl = createValidator(t)

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const url = input.value.trim()

        state.ui.form.status = FORM_STATUS.SENDING
        state.ui.form.value = url
        state.ui.form.error = ''
        state.ui.form.valid = true

        const existingUrls = state.feeds.map(feed => feed.url)

        validateUrl(url, existingUrls)
            .then(validUrl => fetchRSS(validUrl))
            .then(xml => parseRSS(xml, url))
            .then(({ feed, posts }) => {
                state.feeds.push(createFeed(feed.url, feed.title, feed.description))
                posts.forEach(post => {
                    const processedPost = createPost(
                        state.feeds[state.feeds.length -1].id,
                        post.title,
                        post.link,
                        post.description)
                    state.posts.push(processedPost)
                })
                
                console.log(state.posts)

                state.ui.form.status = FORM_STATUS.SUCCESS
                state.ui.form.value = '';
                state.ui.form.error = null;
                state.ui.form.valid = true
            })
            .catch((error) => {
                state.ui.form.status = FORM_STATUS.ERROR
                state.ui.form.error = error.message
                state.ui.form.valid = false
            })
    })
}
