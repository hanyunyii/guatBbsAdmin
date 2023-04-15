import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')===undefined?'':localStorage.getItem('userInfo')),
    token: localStorage.getItem('token')
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
