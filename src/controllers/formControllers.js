import { fetchRSS } from '../http/api.js'
import { FORM_STATUS } from '../utils/consts.js'
import createValidator from '../models/validate.js'

export default (state, elements) => {
    const { input, form } = elements
    const validateUrl = createValidator()

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const url = input.value

        state.ui.form.status = FORM_STATUS.SENDING
        state.ui.form.value = url

        validateUrl(url, state.feeds)
            .then(validUrl => {
                fetchRSS(validUrl)
            })
            .then(() => {
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
