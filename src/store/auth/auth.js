import Authorization from '@/helpers/Authorization'
import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: true,
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
    }
  },
  actions: {
    setToken ({ commit }, payload) {
      commit('setToken', payload)
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
    }
  }
}
