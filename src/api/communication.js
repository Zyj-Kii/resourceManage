import Vue from 'vue'
import { POST_LIMIT, COMMENT_LIMIT } from 'common/communication'
export function getPost (page) {
  const url = '/common/message/getAllMessage'
  const limit = POST_LIMIT
  const data = {
    page,
    limit
  }
  return Vue.prototype.$get(url, data)
}
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
export function post (messageContent) {
  const url = '/user/message/postMessage'
  const data = {messageContent}
  return Vue.prototype.$post(url, data)
}
export function comment (messageId, commentContent) {
  const url = '/user/comment/commentMessage'
  const data = {
    messageId,
    commentContent
  }
  return Vue.prototype.$post(url, data)
}