import * as yup from 'yup';

export default () => {
    return (url, existingUrls) => {
        const schema = yup.string().url().required().notOneOf(existingUrls)
        return schema.validate(url)
    }
}
