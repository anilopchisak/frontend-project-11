import * as yup from 'yup';

export default (t) => {
    yup.setLocale({
        string: {
            url: () => t('errors.invalidUrl')
        },
        mixed: {
            required: () => t('errors.required'),
            notOneOf: () => t('errors.duplicateUrl')
        }
    })

    return (url, existingUrls) => {
        const schema = yup.string()
        .url()
        .required()
        .notOneOf(existingUrls)
        
        return schema.validate(url)
    }
}
