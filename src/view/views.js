import { FORM_STATUS } from "../utils/consts"

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
        feedback.classList.add('text-danger')
    }

    if (state.ui.form.status === FORM_STATUS.SUCCESS) {
        feedback.textContent = t('success')
        feedback.classList.add('text-success')
    }

    input.focus()
}

export const renderAll = (state, elements, t) => {
    renderForm(state, elements, t)
}
