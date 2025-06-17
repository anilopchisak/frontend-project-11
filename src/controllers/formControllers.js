import { fetchRSS } from '../http/api.js'
import { FORM_STATUS } from '../utils/consts.js'
import createValidator from '../models/validate.js'
import parseRSS from '../models/parser.js'
import { uniqueId } from 'lodash'

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

        validateUrl(url, state.feeds)
            .then(validUrl => fetchRSS(validUrl))
            .then((response) => parseRSS(response.trim()))
            .then((parsedRSS) => {
                state.feeds.push({
                    id: uniqueId('feed_'),
                    url: url
                })
                state.posts.push({
                    id: uniqueId('post_'),
                    url: parsedRSS
                })

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
