<template>
    <div>
        <r-header
          @headerChange="handleHeaderChange"
          @logout="handleLogout"
          :defaultActive="defaultActive"
          :header="headerList"></r-header>
        <keep-alive exclude="CommunicationBrowse">
          <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import RHeader from 'components/basic/r-header'
export default {
  name: 'Resource',
  data () {
    return {
      headerList: [
        {
          title: '资源学习区',
          submenu: [
            {
              title: '资源浏览',
              route: '/user/resource/browse'
            },
            {
              title: '资源上传',
              route: '/user/resource/upload'
            }
          ]
        },
        {
          title: '用户交流区',
          submenu: [
            {
              title: '查看帖子',
              route: '/user/communicate/browse'
            },
            {
              title: '发布帖子',
              route: '/user/communicate/post'
            }
          ]
        },
        {
          title: '个人中心',
          submenu: [
            {
              title: '我的资源',
              route: '/user/private/resource'
            },
            {
              title: '我的收藏',
              route: '/user/private/collect'
            },
            {
              title: '我的贴子',
              route: '/user/private/post'
            }
          ]
        }
      ],
      currentComponent: 'SearchResource',
      defaultActive: '/user/resource/browse'
    }
  },
  methods: {
    handleHeaderChange () {
      console.log('a')
    },
    handleLogout () {
      this.$get('/user/userLogout')
        .then(res => {
          if (res.code === 2000) {
            this.$successToast('退出登录成功')
            sessionStorage.removeItem('role')
            sessionStorage.removeItem('username')
            setTimeout(() => {
              this.$router.push({path: '/account/signin'})
            }, 1500)
          }
        })
    },
    _handleHeaderChange (operation) {
      this.currentComponent = operation
    }
  },
  components: {
    RHeader
  }
}
</script>
<style scoped lang="stylus">

</style>
