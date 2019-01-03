import Vue from 'vue'
// 退出登录
export function logout () {
  const url = '/admin/adminLogout'
  return Vue.prototype.$get(url)
}
