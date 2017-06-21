/**
 * Created by root on 2017/6/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules:{
    mutations
  },
  actions,
  string:debug
})
