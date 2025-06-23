import { FORM_STATUS } from '../utils/consts'

const createCard = (title, t) => {
  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const cardTitle = document.createElement('h2')
  cardTitle.classList.add('card-title', 'h4')
  cardTitle.textContent = t(`${title}`)

  cardBody.append(cardTitle)

  const list = document.createElement('ul')
  list.classList.add('list-group', 'border-0', 'rounded-0')

  card.append(cardBody)
  card.append(list)

  return card
}

const renderPosts = (posts, readPosts, elements, t) => {
  if (posts.length === 0) return

  const { postsContainer } = elements
  postsContainer.textContent = ''

  const card = createCard('posts.title', t)
  postsContainer.append(card)

  const postsList = card.querySelector('ul')

  posts.forEach((post) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')

    const link = document.createElement('a')
    if (readPosts.includes(post.id)) {
      link.classList.replace('fw-bold', 'fw-normal')
      link.classList.add('link-secondary')
    }
    else {
      link.classList.add('fw-bold')
    }
    link.setAttribute('href', post.link)
    link.setAttribute('data-id', post.id)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
    link.textContent = post.title

    const button = document.createElement('button')
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.setAttribute('type', 'button')
    button.setAttribute('data-id', post.id)
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#modal')
    button.textContent = t('posts.view')

    li.append(link)
    li.append(button)
    postsList.append(li)
  })
}

const renderFeeds = (feeds, elements, t) => {
  if (feeds.length === 0) return

  const { feedsContainer } = elements
  feedsContainer.textContent = ''

  const card = createCard('feeds.title', t)
  feedsContainer.append(card)

  const feedsList = card.querySelector('ul')

  feeds.forEach((feed) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'border-0', 'border-end-0')

    const feedTitle = document.createElement('h3')
    feedTitle.classList.add('h6', 'm-0')
    feedTitle.textContent = feed.title

    const feedDescription = document.createElement('p')
    feedDescription.classList.add('m-0', 'small', 'text-black-50')
    feedDescription.textContent = feed.description

    li.append(feedTitle)
    li.append(feedDescription)

    feedsList.append(li)
  })
}

const renderForm = (state, elements, t) => {
  const { input, submit, feedback } = elements

  input.value = state.ui.form.value
  input.classList.remove('is-invalid')
  feedback.textContent = ''

  if (state.ui.form.status === FORM_STATUS.SENDING) {
    input.disabled = true
    submit.disabled = true
    return
  }

  input.disabled = false
  submit.disabled = false

  if (state.ui.form.status === FORM_STATUS.ERROR) {
    input.classList.add('is-invalid')
    feedback.textContent = t(state.ui.form.error)
    feedback.classList.replace('text-success', 'text-danger')
  }

  if (state.ui.form.status === FORM_STATUS.SUCCESS) {
    feedback.textContent = t('success')
    feedback.classList.replace('text-danger', 'text-success')
  }
}

export const renderAll = (state, elements, t) => {
  renderForm(state, elements, t)
  renderFeeds(state.feeds, elements, t)
  renderPosts(state.posts, state.ui.readPosts, elements, t)
}
