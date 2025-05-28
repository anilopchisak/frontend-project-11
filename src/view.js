import onChange from 'on-change'

export default (obj) => {
    const watchedObj = onChange(obj, (path, value, previousValue) => {
        console.log(`Путь "${path}" изменился с ${previousValue} на ${value}`)
    })
    return watchedObj
}
