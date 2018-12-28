import Vue from 'vue'
export function upload (formData) {
  const url = '/user/resource/uploadResource'
  return Vue.prototype.$post(url, formData)
}
