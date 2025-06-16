import onChange from 'on-change'
import { FORM_STATUS } from '../utils/consts'

export const initState = () => ({
    feeds: [],
    posts: [],
    ui: {
        form: {
            status: FORM_STATUS.FILLING,
            error: null,
            valid: true,
            value: ''
        },
    }
})

export const makeWatchedState = (initialState, renderAll) => {
    const watchedState = onChange(initialState, (state, elements) => {
        renderAll(state, elements)
    })
    return watchedState
}
