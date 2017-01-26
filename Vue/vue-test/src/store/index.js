// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

// mock data
const state = {
  totalTime: 0,
  list: []
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})
