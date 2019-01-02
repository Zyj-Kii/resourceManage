import Vue from 'vue'
import Router from '@/router'
import { POST_LIMIT, COMMENT_LIMIT } from 'common/communication'
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
