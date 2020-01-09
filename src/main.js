import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
import Axios from 'axios'
// 配置请求信息
var $http = Axios.create({
  baseURL: 'http://localhost:4399',
  timeout: '6000'
  // headers: {'X-Custom-Header': 'foobar'}     // header传值，例如：Authorization
})
Vue.prototype.$http = $http
// 开启debug
Vue.config.debug = true
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
