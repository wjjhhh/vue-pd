/**
 * Created by root on 2017/6/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import shop from './modules/shop'
import queue from './modules/queue'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.store({
  modules:{
    shop,
    queue
  },
  string:debug
})
