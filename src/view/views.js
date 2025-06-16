import { FORM_STATUS } from "../utils/consts"

const renderForm = (state, elements) => {
    const { input } = elements

    if (state.ui.form.valid) {
        input.classList.remove('is-invalid')
    }
    else {
        input.classList.add('is-invalid')
    }

    if (state.ui.form.status === FORM_STATUS.SENDING) {
        input.disabled = true
    }
    else {
        input.disabled = false
    }

    input.value = state.ui.form.value
    input.focus()
}

export const renderAll = (state, elements) => {
    renderForm(state, elements)
}
