import Vue from 'vue'
// 获取资源类型
export function getResourceCategory (page = 1, limit = 100) {
  const url = '/common/category/getCategory'
  const data = {
    page,
    limit
  }
  return Vue.prototype.$post(url, data)
}
// 添加资源类型
export function addCategory (data) {
  const url = '/admin/category/addCategory'
  return Vue.prototype.$post(url, data)
}
// 删除资源类型
export function deleteCategory (categoryId) {
  const url = '/admin/category/deleteCategory'
  const data = {categoryId}
  return Vue.prototype.$post(url, data)
}
// 修改资源类型
export function modifyCategory (data) {
  const url = '/admin/category/modifyCategory'
  return Vue.prototype.$post(url, data)
}