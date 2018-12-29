import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Http from './utils/http'
import Toast from './utils/toast'
import PackUrl from './utils/packUrl'
import Time from './utils/time'
import 'styles/global.styl'
Vue.use(Element)
Vue.use(Toast)
Vue.use(router)
Vue.use(Http)
Vue.use(PackUrl)
Vue.use(Time)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
