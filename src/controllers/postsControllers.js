export default (state, elements) => {
  const { postsContainer, modal } = elements

  const markPostAsRead = (state, postId) => {
    if (!state.ui.readPosts.includes(postId))
      state.ui.readPosts.push(postId)
  }

  postsContainer.addEventListener('click', (e) => {
    const previewButton = e.target.closest('button[data-bs-toggle="modal"]')
    if (previewButton) {
      const postId = previewButton.dataset.id
      const post = state.posts.find(p => p.id === postId)
      if (!post) return

      markPostAsRead(state, postId)

      modal.title.textContent = post.title
      modal.body.textContent = post.description
      modal.readFull.href = post.link

      return
    }

    const link = e.target.closest('a[data-id][target="_blank"]')
    if (link) {
      const postId = link.dataset.id
      markPostAsRead(state, postId)
    }
  })
}
