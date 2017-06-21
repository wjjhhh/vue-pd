// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

import App from './App'
import router from './router'
import stores from './store/store'

require("lib-flexible");
// console.log(stores)
Vue.config.productionTip = false

Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
  preload:1.2,
  attempt:1,
  loading:require('./assets/img/default_goods.png'),
  error:require('./assets/img/default_goods.png'),
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:stores,
  template: '<App/>',
  components: { App }
})
