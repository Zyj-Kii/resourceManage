import Vue from 'vue'
import Router from '@/router'
import { RESOURCE_PAGE_SIZE } from 'common/resource'
// 上传资源
export function upload (formData) {
  const url = '/user/resource/uploadResource'
  return Vue.prototype.$post(url, formData)
}
// 获取资源类型
export function getResourceCategory () {
  const url = '/common/category/getCategory'
  const data = {
    page: 1,
    limit: 100
  }
  return Vue.prototype.$post(url, data)
}
// 获取某个类型下的资源
export function getResource (categoryId, page) {
  let url
  const name = Router.history.current.name
  if (name === 'ResourceBrowse') {
    url = '/common/resource/getAllResource'
  } else if (name === 'PrivateResource') {
    url = '/user/resource/getResource'
  } else {
    url = '/user/collect/getCollect'
  }
  const data = {
    categoryId,
    page,
    limit: RESOURCE_PAGE_SIZE
  }
  return Vue.prototype.$get(url, data)
}
// 获取用户收藏的资源
export function collectResource (resourceId) {
  const url = '/user/collect/collectResource'
  const data = {resourceId}
  return Vue.prototype.$get(url, data)
}
// 用户取消收藏
export function cancelCollect (collectId) {
  const url = '/user/collect/deleteCollect'
  const data = {collectId}
  return Vue.prototype.$get(url, data)
}
// 用户删除资源
export function deleteResource (resourceId) {
  const url = '/user/resource/userDeleteResource'
  const data = {resourceId}
  return Vue.prototype.$get(url, data)
}
