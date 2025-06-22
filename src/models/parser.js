import { ERROR_STATUS } from "../utils/consts"

export default (xml, url) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, "text/xml")
    
    const channel = doc.querySelector('channel')
    if (!channel) throw new Error(`${ERROR_STATUS.PARSING}`)

    const title = channel.querySelector('title')?.textContent || 'No title'
    const description = channel.querySelector('description')?.textContent || ''

    const items = doc.querySelectorAll('item')
    const posts = Array.from(items).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        description: item.querySelector('description')?.textContent || ''
    }))

    return {
        feed: {
            title,
            description,
            url
        },
        posts
    }
}
