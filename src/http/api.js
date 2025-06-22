import axios from 'axios'
import { ERROR_STATUS } from '../utils/consts.js'

export const fetchRSS = (url) => {
    const proxyUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`
    return axios.get(proxyUrl)
        .then(response => {
            if (response.data.contents === null) 
                throw new Error(`${response.data.status.error.name}`)
            return response.data.contents
        })
        .catch(() => {
            throw new Error(`${ERROR_STATUS.NETWORK}`)
        })
}
