import Vue from 'vue'
import { RESOURCE_PAGE_SIZE } from 'common/resource'
export function upload (formData) {
  const url = '/user/resource/uploadResource'
  return Vue.prototype.$post(url, formData)
}
export function getResourceCategory () {
  const url = '/common/category/getCategory'
  const data = {
    page: 1,
    limit: 100
  }
  return Vue.prototype.$post(url, data)
}
export function getResource (categoryId, page) {
  const url = '/common/resource/getAllResource'
  const data = {
    categoryId,
    page,
    limit: RESOURCE_PAGE_SIZE
  }
  return Vue.prototype.$get(url, data)
}
