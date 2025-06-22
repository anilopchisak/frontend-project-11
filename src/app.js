import initFormController from './controllers/formControllers.js'
import { initState, makeWatchedState } from './store/state.js';
import { renderAll } from './view/views.js'
import i18n from 'i18next'
import resources from './locales/index.js'

export default () => {
    i18n.init({
        lng: 'ru',
        debug: true,
        resources
    })

    const initialState = initState()

    const elements = {
        form: document.getElementById('rss-form'),
        input: document.getElementById('url-input'),
        submit: document.querySelector('button[type="submit"]'),
        feedback: document.getElementById('feedback'),
        feedsContainer: document.querySelector('.feeds'),
        postsContainer: document.querySelector('.posts'),
    }
    
    const state = makeWatchedState(initialState, () => {
        renderAll(state, elements, i18n.t)
    })

    initFormController(state, elements, i18n.t)

    renderAll(state, elements, i18n.t)
}
