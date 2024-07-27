// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Chart from 'chart.js'
import axios from 'axios'
import VueSession from 'vue-session'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)

var options = {
  persist: true
}

Vue.use(VueSession, options)

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
