import { FORM_STATUS } from "../utils/consts"

// const renderPosts = (state, elements, t) => {
//     const { postsContainer } = elements

// }

// const renderFeeds = (state, elements, t) => {
//     const { feedsContainer } = elements

// }

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

    input.focus()
}

export const renderAll = (state, elements, t) => {
    renderForm(state, elements, t)
    // renderFeeds(state, elements, t)
    // renderPosts(state, elements, t)
}
