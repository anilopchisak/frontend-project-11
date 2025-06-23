import { fetchRSS } from './api'
import parseRSS from '../models/parser.js'
import { createPost } from '../store/models'
import { FORM_STATUS, UPDATE_INTERVAL } from '../utils/consts'

const updateFeeds = (state, isUpdating) => {
  if (isUpdating || state.ui.form.status === FORM_STATUS.SENDING) return
  isUpdating = true

  const promises = state.feeds.map(feed => {
    const existingUrls = state.posts
      .filter(post => post.feedId === feed.id)
      .map(post => post.link)
    const url = feed.url
    return fetchRSS(url)
      .then(xml => parseRSS(xml, url))
      .then(({ posts }) => {
        posts
          .filter(post => !existingUrls.includes(post.link))
          .forEach(post => {
            const processedPost = createPost(
                state.feeds.at(-1).id,
                post.title,
                post.link,
                post.description)
            state.posts.push(processedPost)
          })
      })
      .catch(error => {
        console.error(`Ошибка обновления фида ${feed.url}:`, error)
        return 0
      })
  })

  Promise.all(promises)
    .then(() => {
      setTimeout(updateFeeds, UPDATE_INTERVAL)
    })
    .finally(() => {
      isUpdating = false
    })
}

export default state => {
  let isUpdating = false

  updateFeeds(state, isUpdating)
}
