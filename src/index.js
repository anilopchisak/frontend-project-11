import { string } from 'yup';
import watch from './view.js'
// https://lorem-rss.hexlet.app/feed

// const stateUpdate = (state) => {

// }

const render = (form, input) => {
    form.reset()
    input.focus()
}

const validateLink = (rssSchema, state, link) => {
    return rssSchema.isValid(link)
        .then((valid) => {
            if (!valid) return false
            if (state.links.includes(link)) return false
            return true
        })
        .catch((error) => {
            state.errors.validation.push(error)
            throw new Error(error)
        })
}

const sendForm = (url) => {
    // return fetch(link)
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((data) => {
    //         console.log(data)
    //     })
    //     .catch((error) => {
    //         state.errors.fetch.push(error)
    //         throw new Error(error)
    //     })
    console.log(`fetch url ${url}`)
    return url
}

export default () => {
    const state = {
        links: []
    }

    const watchedState = watch(state)

    const inputEl = document.getElementById('url-input')
    const formEl = document.getElementById('rss-form')

    let rssSchema = string().url().required()

    formEl.addEventListener('submit', (event) => {
        event.preventDefault()
        const url = inputEl.value
        validateLink(rssSchema, watchedState, url)
            .then((valid) => {
                if (!valid) {
                    inputEl.classList.add('is-invalid')
                    throw new Error(`invalid url: ${url}`)
                }
                else {
                    inputEl.classList.remove('is-invalid')
                }
            })
            .then(() => sendForm(url))
            .then((data) => {
                console.log(data)
                watchedState.links.push(url)
            })
            .then(() => render(formEl, inputEl))
            .catch((error) => {
                throw new Error(error)
            })
    })
}
