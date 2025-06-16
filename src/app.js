import initFormController from './controllers/formControllers.js'
import { initState, makeWatchedState } from './store/state.js';
import { renderAll } from './view/views.js'
// import i18n from 'i18next'

export default () => {
    const initialState = initState()

    const elements = {
        form: document.getElementById('rss-form'),
        input: document.getElementById('url-input')
    }
    
    const state = makeWatchedState(initialState, () => {
        renderAll(state, elements)
    })

    initFormController(state, elements)

    renderAll(state, elements)
}
