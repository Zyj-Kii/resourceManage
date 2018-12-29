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
export function getCommon (messageId, page) {
  const url = '/user/comment/getComment'
  const limit = COMMENT_LIMIT
  const data = {
    messageId,
    page,
    limit
  }
  return Vue.prototype.$get(url, data)
}
