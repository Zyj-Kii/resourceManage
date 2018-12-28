import {BASE_URL} from 'api/config'
export default {
  install (Vue) {
    Vue.prototype.$packUrl = url => {
      return BASE_URL + '/' + url
    }
  }
}
