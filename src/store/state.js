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

export const makeWatchedState = (initialState, renderCallback) => {
    const watchedState = onChange(initialState, (path) => {
        const renderPaths = [
            'feeds',
            'posts',
            'ui.form'
        ]

        if (renderPaths.some(p => path.startsWith(p))) {
            renderCallback()
        }
    })
    return watchedState
}
