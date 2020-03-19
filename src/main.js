import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
import axios from 'axios'

// axios.interceptors.request.use(
//   config => {
//     // 判断是否存在token，如果存在的话，则每个http header都加上token
//     if (window.sessionStorage.token) {
//       config.headers = `token ${window.sessionStorage.token}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })
// 配置请求信息
var $http = axios.create({
  baseURL: 'http://127.0.0.1:4399',
  timeout: '6000',
  headers: { token: window.sessionStorage.getItem('token') }
})
Vue.prototype.$http = $http
// 开启debug
Vue.config.debug = true
Vue.config.productionTip = false
// 开启跨域
axios.defaults.withCredentials = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
