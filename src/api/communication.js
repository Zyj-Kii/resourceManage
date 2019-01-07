import Vue from 'vue'
import Router from '@/router'
import { POST_LIMIT, COMMENT_LIMIT } from 'common/communication'
// 获取帖子 根据路由判断获取所有帖子还是获取用户的帖子
export function getPost (page) {
  let url
  const name = Router.history.current.name
  if (name === 'PostControl' || name === 'CommunicationBrowse') {
    url = '/common/message/getAllMessage'
  } else if (name === 'PrivatePost') {
    url = '/user/message/getMessage'
  }
  const limit = POST_LIMIT
  const data = {
    page,
    limit
  }
  return Vue.prototype.$get(url, data)
}
// 获取评论
export function getComment (messageId, page) {
  const url = '/common/comment/getComment'
  const limit = COMMENT_LIMIT
  const data = {
    messageId,
    page,
    limit
  }
  return Vue.prototype.$get(url, data)
}
// 用户上传帖子
export function post (messageContent) {
  const url = '/user/message/postMessage'
  const data = {messageContent}
  return Vue.prototype.$post(url, data)
}
// 评论帖子
export function comment (messageId, commentContent) {
  const url = '/user/comment/commentMessage'
  const data = {
    messageId,
    commentContent
  }
  return Vue.prototype.$post(url, data)
}
// 用户删除帖子
export function deletePost (messageId) {
  const url = '/user/message/deleteMessage'
  const data = {messageId}
  return Vue.prototype.$get(url, data)
}
// 管理员删除帖子
export function adminDeletePost (messageId) {
  const url = '/admin/message/deleteMessage'
  const data = {messageId}
  return Vue.prototype.$get(url, data)
}
// 设置评论质量
export function setCommentQuality (commentId, commentQuality) {
  const url = '/admin/comment/markCommentQuality'
  const data = {commentId, commentQuality}
  return Vue.prototype.$get(url, data)
}
