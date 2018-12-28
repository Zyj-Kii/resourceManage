import Vue from 'vue'
import Router from 'vue-router'
import BaseAccount from 'components/account/BaseAccount'
import Login from 'components/account/Login'
import ModifyPassword from 'components/account/ModifyPassword'
import Resource from 'components/resource/resource'
import Upload from 'components/resource/upload'
import Browse from 'components/resource/search'
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
      path: '/user/resource',
      name: 'Resource',
      component: Resource,
      children: [
        {
          path: 'upload',
          component: Upload,
          meta: {requireAuth: true}
        },
        {
          path: 'browse',
          component: Browse
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
