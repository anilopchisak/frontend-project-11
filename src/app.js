import initFormController from './controllers/formControllers.js'
import initPostsController from './controllers/postsControllers.js'
import { initState, makeWatchedState } from './store/state.js';
import initUpdater from './http/updater.js'
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
        modal: {
            title: document.querySelector('.modal-title'),
            body: document.querySelector('.modal-body'),
            readFull: document.querySelector('a.btn')
        }
    }
    
    const state = makeWatchedState(initialState, () => {
        renderAll(state, elements, i18n.t)
    })

    initFormController(state, elements, i18n.t)
    initPostsController(state, elements)
    initUpdater(state)

    renderAll(state, elements, i18n.t)
    elements.input.focus()
}
