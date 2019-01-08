import { $get, $post } from '@/utils/http'
// 退出登录
export function adminLogout () {
  const url = '/admin/adminLogout'
  return $get(url)
}
export function adminLogin (adminName, adminPassword) {
  const url = '/admin/adminLogin'
  const data = {adminName, adminPassword}
  return $post(url, data)
}
export function adminRegister (adminName, adminPassword) {
  const url = '/admin/adminRegister'
  const data = {adminName, adminPassword}
  return $post(url, data)
}
export function adminModify (prePassword, newPassword) {
  const url = '/admin/adminModifyPassword'
  const data = {prePassword, newPassword}
  return $post(url, data)
}
export function userLogin (userName, userPassword) {
  const url = '/user/userLogin'
  const data = {userName, userPassword}
  return $post(url, data)
}
export function userLogout () {
  const url = '/user/userLogout'
  return $get(url)
}
export function userRegister (userName, userPassword, userRole) {
  const url = '/user/userRegister'
  const data = {userName, userPassword, userRole}
  return $post(url, data)
}
export function userModify (prePassword, newPassword) {
  const url = '/user/userModifyPassword'
  const data = {prePassword, newPassword}
  return $post(url, data)
}
