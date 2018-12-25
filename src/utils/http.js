import axios from 'axios'
// qs 是对 post 请求 data 进行处理，不然后台接收不了数据
// 因为axios post请求默认Content-type是 application/json
import qs from 'qs'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://www.yoryz.cn/Share'
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
  request => {
    request.data = qs.stringify(request.data)
    request.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 *  封装get方法 跟 post 方法
 *  @param url
 *  @param params
 *  @returns {Promise}
 */

export default {
  install: (Vue) => {
    Vue.prototype.$get = (url, params = {}) => {
      return new Promise((resolve, reject) => {
        axios.get(url, {params})
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    }
    Vue.prototype.$post = (url, params = {}) => {
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    }
  }
}
