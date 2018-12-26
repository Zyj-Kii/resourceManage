<template>
    <div>
        <r-header
          @headerChange="handleHeaderChange"
          @logout="handleLogout"
          @select="handleSelect"
          :defaultActive="defaultActive"
          :header="headerList"></r-header>
        <keep-alive>
          <component :is="currentComponent"></component>
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
              operation: 'SearchResource'
            },
            {
              title: '资源上传',
              operation: 'UploadResource'
            }
          ]
        },
        {
          title: '用户交流区',
          operation: 'Communication'
        }
      ],
      currentComponent: 'SearchResource',
      defaultActive: '0-0'
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
    handleSelect (index) {
      if (index.indexOf('-') !== -1) {
        let cascade = index.split('-')
        this._handleHeaderChange(this.headerList[cascade[0]].submenu[cascade[1]].operation)
      } else {
        this._handleHeaderChange(this.headerList[index].operation)
      }
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
