import Vue from 'vue'
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
    limit: 10
  }
  return Vue.prototype.$get(url, data)
}
