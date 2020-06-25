import Axios from 'axios'
import i18n from '@/locales'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_PATH || '/web/api/',
  headers: {
    'Accept-Language': i18n.locale
  }
})

export { axios }
