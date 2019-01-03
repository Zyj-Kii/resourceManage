import Vue from 'vue'
import Router from 'vue-router'
// 账号相关页面
import BaseAccount from 'components/account/BaseAccount'
import Login from 'components/account/Login'
import ModifyPassword from 'components/account/ModifyPassword'

// 用户相关页面
import User from 'components/basic/user'
import ResourceUpload from 'components/resource/upload'
import ResourceBrowse from 'components/resource/browse'
import CommunicationBrowse from 'components/communication/browse'
import CommunicationPost from 'components/communication/post'

// 管理员页面
import Admin from 'components/basic/admin'
import StudentList from 'components/student/list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/account',
      name: 'Account',
      component: BaseAccount,
      children: [
        {
          path: 'signin',
          name: 'Signin',
          alias: 'signup',
          component: Login
        },
        {
          path: 'modify',
          name: 'ModifyPassword',
          meta: {requireAuth: true},
          component: ModifyPassword
        }
      ]
    },
    {
      path: '/user',
      name: 'Resource',
      component: User,
      children: [
        {
          path: 'resource/upload',
          component: ResourceUpload,
          name: 'ResourceUpload',
          meta: {requireAuth: true}
        },
        {
          path: 'resource/browse',
          name: 'ResourceBrowse',
          component: ResourceBrowse
        },
        {
          path: 'communicate/browse',
          name: 'CommunicationBrowse',
          component: CommunicationBrowse
        },
        {
          path: 'communicate/post',
          name: 'CommunicationPost',
          component: CommunicationPost,
          meta: {requireAuth: true}
        },
        {
          path: 'private/post',
          name: 'PrivatePost',
          meta: {requireAuth: true},
          component: CommunicationBrowse
        },
        {
          path: 'private/collect',
          name: 'PrivateCollect',
          meta: {requireAuth: true},
          component: ResourceBrowse
        },
        {
          path: 'private/resource',
          name: 'PrivateResource',
          meta: {requireAuth: true},
          component: ResourceBrowse
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: {requireAuth: true},
      component: Admin,
      children: [
        {
          path: 'student/list',
          name: 'StudentList',
          component: StudentList
        }
      ]
    },
    {
      path: '*',
      redirect: 'user/resource/browse'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!sessionStorage.getItem('username')) {
      Vue.prototype.$errorToast('尚未登录')
      setTimeout(() => {
        next({
          path: '/account/signin'
        })
      }, 1500)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
