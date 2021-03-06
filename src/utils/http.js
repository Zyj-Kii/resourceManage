import axios from 'axios'
// qs 是对 post 请求 data 进行处理，不然后台接收不了数据
// 因为axios post请求默认Content-type是 application/json
import qs from 'qs'
import Router from '@/router/index'
import { ERR_OK, UNAUTHORIZED } from 'api/config'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://www.yoryz.cn/Share'
axios.defaults.withCredentials = true

/**
 *  封装get方法 跟 post 方法
 *  @param url
 *  @param params
 *  @returns {Promise}
 */

// http request 拦截器
axios.interceptors.request.use(
  request => {
    if (request.data instanceof FormData) {
      request.headers = {
        'Content-Type': 'multipart/form-data '
      }
    } else {
      request.data = qs.stringify(request.data)
      request.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(response => {
  if (response.data.code === UNAUTHORIZED) {
    sessionStorage.setItem('goback', 1)
    Router.push({path: '/account/signin'})
    return response.data
  } else if (response.data.code !== ERR_OK) {
    return Promise.reject(response.data.message)
  } else {
    return response.data
  }
})

export function $get (url, params = {}) {
  return axios.get(url, {params})
}

export function $post (url, params = {}) {
  return axios.post(url, params)
}
