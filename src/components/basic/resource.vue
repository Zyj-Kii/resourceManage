<template>
    <div>
        <r-header
          @headerChange="handleHeaderChange"
          @logout="handleLogout"
          :header="headerList"></r-header>
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
          title: '资源学习区'
        },
        {
          title: '用户交流区'
        }
      ]
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
    }
  },
  components: {
    RHeader
  }
}
</script>
