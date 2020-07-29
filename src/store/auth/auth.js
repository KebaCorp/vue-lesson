import Authorization from '@/helpers/Authorization'
import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    token: Authorization.getAccessToken(),
    isAuthorized: Authorization.isAuthorized()
  },
  getters: {
    loading (state) {
      return state.loading
    },
    token (state) {
      return state.token
    },
    isAuthorized (state) {
      return state.isAuthorized
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setToken (state, { expiresAt, refreshToken, token }) {
      Authorization.setData({
        accessTokenExpires: expiresAt,
        accessToken: token,
        refreshToken
      })

      state.token = token
      state.isAuthorized = Authorization.isAuthorized()
    },
    clearToken (state) {
      Authorization.clearData()

      state.token = Authorization.getAccessToken()
      state.isAuthorized = Authorization.isAuthorized()
    },
    clearLocalStorage () {
      localStorage.removeItem('user')
    }
  },
  actions: {
    setToken ({ commit }, payload) {
      commit('setToken', payload)
    },

    /**
     * Login.
     *
     * @param commit
     * @param LoginForm
     * @returns {Promise<boolean>}
     */
    async login ({ commit }, { LoginForm }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('authorization/login', {
          LoginForm
        })

        if (data && data.token) {
          commit('setToken', data.token)
          return true
        } else {
        }
      } catch (e) {
      } finally {
        commit('toggleLoading', false)
      }

      return false
    },

    /**
     * Update token.
     *
     * @param commit
     * @returns {Promise<boolean>}
     */
    async updateToken ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('authorization/update-token', {
          refreshToken: Authorization.getRefreshToken()
        })

        if (data.token) {
          commit('setToken', data.token)
        } else {
          return false
        }
      } catch (e) {
        return false
      } finally {
        commit('toggleLoading', false)
      }

      return true
    },

    /**
     * Logout.
     *
     * @param commit
     */
    async logout ({ commit }) {
      commit('clearToken')
      commit('clearLocalStorage')

      return true
    }
  }
}
