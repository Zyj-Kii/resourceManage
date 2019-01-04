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
