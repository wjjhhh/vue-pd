// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

import App from './App'
import router from './router'
import stores from './store/store'
import VueResource from 'vue-resource'

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
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:stores,
  template: '<App/>',
  components: { App }
})
// // 异步引入fastclick 解决300ms延时问题
require.ensure([], function (require) {
  let fastclick = require("fastclick");
  fastclick.attach(document.body);
}, 'load_fastclick');

