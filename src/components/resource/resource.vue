<template>
    <div>
        <r-header
          @headerChange="handleHeaderChange"
          @logout="handleLogout"
          :defaultActive="defaultActive"
          :header="headerList"></r-header>
        <keep-alive>
          <router-view exclude="Upload"></router-view>
        </keep-alive>
    </div>
</template>
<script>
import RHeader from 'components/basic/r-header'
import SearchResource from './search'
import UploadResource from './upload'
import Communication from 'components/communication/communication'
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
          route: '/user/communicate'
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
    RHeader,
    SearchResource,
    UploadResource,
    Communication
  }
}
</script>
<style scoped lang="stylus">

</style>
