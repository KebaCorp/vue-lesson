export default {
  namespaced: true,
  state: {
    loading: true,
    token: null
  },
  getters: {
    loading (state) {
      return state.loading
    },
    token (state) {
      return state.token
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    setToken ({ commit }, payload) {
      commit('setToken', payload)
    }
  }
}
