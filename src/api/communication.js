import Vue from 'vue'
import Router from '@/router'
import { POST_LIMIT, COMMENT_LIMIT } from 'common/communication'
// 获取帖子
export function getPost (page) {
  let url
  if (Router.history.current.path === '/user/communicate/browse') {
    url = '/common/message/getAllMessage'
  } else {
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
  const url = '/user/message/userDeleteMessage'
  const data = {messageId}
  return Vue.prototype.$get(url, data)
}
