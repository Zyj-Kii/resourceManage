export default {
  install: (Vue) => {
    Vue.prototype.$successToast = (message, duration = 3000) => {
      Vue.prototype.$message({
        type: 'success',
        message,
        duration
      })
    }
    Vue.prototype.$errorToast = (message, duration = 3000) => {
      Vue.prototype.$message({
        type: 'error',
        message,
        duration
      })
    }
    Vue.prototype.$errorNotify = (message = '出现错误！', duration = 0, position = 'bottom-right') => {
      Vue.prototype.$notify({
        type: 'error',
        title: '出错啦',
        message,
        duration,
        position
      })
    }
  }
}
