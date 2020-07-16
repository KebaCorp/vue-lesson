import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/auth'
import heroes from './hero/heroes'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    heroes
  }
})
