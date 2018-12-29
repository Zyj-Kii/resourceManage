function fixNumberLength (num, length = 2) {
  let _length = num.length
  let _num = ''
  while (_length < length) {
    _num += '0'
    _length++
  }
  return _num + num
}
export default {
  install (Vue) {
    Vue.prototype.$formatTime = function (time) {
      time = new Date(time)
      const year = time.getFullYear()
      const month = fixNumberLength(time.getMonth() + 1)
      const day = fixNumberLength(time.getDate())
      return year + '/' + month + '/' + day
    }
  }
}
