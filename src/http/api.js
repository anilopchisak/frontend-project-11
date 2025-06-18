import axios from 'axios'

export const fetchRSS = (url) => {
    const proxyUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`
    return axios.get(proxyUrl)
        .then(response => {
            if (response.status !== 200) 
                throw new Error(`Network response was not ok: ${response.status}`)
            return response.data.contents
        })
}
