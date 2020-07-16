import Axios from 'axios'
import i18n from '@/locales'
import Authorization from '@/helpers/Authorization'
import store from '@/store'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_PATH || '/web/api/',
  headers: {
    'Accept-Language': i18n.locale
  }
})

/**
 * Действия перед отправкой запроса.
 */
axios.interceptors.request.use(config => {
  if (Authorization.isAuthorized()) {
    config.headers.Authorization = `Bearer ${ Authorization.getAccessToken() }`
  }

  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => {
  return Promise.resolve(response)
}, async error => {
  if (error.response.status === 401) {
    try {
      await store.dispatch('auth/updateToken')
      error.response.config.headers.Authorization = `Bearer ${ Authorization.getAccessToken() }`
      return axios(error.response.config)
    } catch (e) {
    }
  }
})

export { axios }
