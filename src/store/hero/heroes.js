import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    heroes: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    heroes (state) {
      return state.heroes
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setHeroes (state, payload) {
      state.heroes = Array.isArray(payload) ? payload : []
    }
  },
  actions: {
    /**
     * Get heroes from API.
     *
     * @param commit
     * @returns {Promise<boolean>}
     */
    async setHeroes ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('hero')

        commit('setHeroes', data)
      } catch (e) {
        return false
      } finally {
        commit('toggleLoading', false)
      }
    },

    /**
     * Create hero.
     *
     * @param commit
     * @param Hero
     * @returns {Promise<boolean>}
     */
    async create ({ commit }, { Hero }) {
      commit('toggleLoading', true)

      try {
        await axios.post('closed/hero/create', {
          Hero
        })
      } catch (e) {
        return false
      } finally {
        commit('toggleLoading', false)
      }
    }
  }
}
