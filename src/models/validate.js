import * as yup from 'yup'
import { ERROR_STATUS } from '../utils/consts.js'

export default (t) => {
  yup.setLocale({
    string: {
      url: () => t(`${ERROR_STATUS.INVALID_URL}`),
    },
    mixed: {
      notOneOf: () => t(`${ERROR_STATUS.DUPLICATE_URL}`),
    },
  })

  return (url, existingUrls) => {
    const schema = yup.string()
      .url()
      .required()
      .notOneOf(existingUrls)

    return schema.validate(url)
  }
}
