import { FORM_STATUS } from "../utils/consts"

const renderForm = (state, elements, t) => {
    const { input, feedback } = elements

    input.value = state.ui.form.value

    if (state.ui.form.status === FORM_STATUS.SENDING) {
        input.disabled = true
        return
    }
    else {
        input.disabled = false
    }

    if (state.ui.form.status === FORM_STATUS.ERROR) {
        input.classList.add('is-invalid')
        feedback.textContent = t(state.ui.form.error)
        feedback.classList.add('text-danger')
        input.focus()
        return
    }

    input.classList.remove('is-invalid')
    feedback.textContent = ''
    input.focus()
}

export const renderAll = (state, elements, t) => {
    renderForm(state, elements, t)
}
