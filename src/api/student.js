import Vue from 'vue'
import { STUDENT_LIMIT } from 'common/student'
// 获取学生列表
export function getStudentList (page) {
  const url = '/admin/adminStudent/getStudent'
  const limit = STUDENT_LIMIT
  const data = {
    page,
    limit
  }
  return Vue.prototype.$get(url, data)
}
// 修改学生信息
export function editStudent (data) {
  const url = '/admin/adminStudent/modifyStudentInfo'
  return Vue.prototype.$post(url, data)
}
// 录入学生信息
export function inputStudent (data) {
  const url = '/admin/adminStudent/addStudent'
  return Vue.prototype.$post(url, data)
}
// 查找学生
export function searchStudent (type, field) {
  let url
  let data
  if (type === 'username') {
    url = '/user/searchUserByName'
    data = {
      userName: field
    }
  } else {
    url = '/user/searchUserByClass'
    data = {
      studentClass: field
    }
  }
  return Vue.prototype.$post(url, data)
}
// 禁/允 发帖子
export function postControl (userId, forbidden) {
  const url = '/admin/adminUser/forbidUserPost'
  const data = {
    userId,
    forbidden
  }
  return Vue.prototype.$get(url, data)
}
