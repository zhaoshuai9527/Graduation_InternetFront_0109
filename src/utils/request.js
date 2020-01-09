import axiox from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

const service = axiox.create({
  baseURL: 'http://localhost:4399',
  timeout: 3000
})

// export const createAPI = (url, method, data) => {
//   let config = {}
//   if (method.toUpperCase() === 'GET') {
//     config.params = data
//   } else {
//     config.data = data
//   }
//
//   return instance({
//     url,
//     method,
//     ...config
//     // url: url,
//     // method: method,
//     // data: ...config
//   })
// }

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['tokenId'] = getToken()
    }
    if (config.data !== undefined) {
      if (config.data.operatorAccountId !== undefined) {
        config.headers['operatorAccountId'] = config.data.operatorAccountId
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (process.env.VUE_APP_USE_MOCK === 'true') {
      return res
    }
    if (res.code !== '1') {
      Message({
        message: res.desc || 'Error',
        type: 'error',
        duration: 3 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === '0' && res.desc === '未登录！') {
        // to re-login
        MessageBox.confirm('登录已过期，请重新登录！', '通知', {
          confirmButtonText: '去登录',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
