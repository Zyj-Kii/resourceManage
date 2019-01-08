<template>
  <div>
    <header>
      <div class="role" v-if="loginStatus">
        你好 {{username}}
      </div>
      <div class="account">
        <template v-if="loginStatus">
          <router-link to="/account/modify">修改密码</router-link>
          <span @click="handleLogout">退出登录</span>
        </template>
        <template v-else>
          <router-link to="/account/signin">去登录</router-link>
        </template>
      </div>
      <template v-if="header.length > 0">
        <el-menu
          :router="true"
          :default-active="defaultActive"
          text-color="#fff"
          active-text-color="rgb(255, 208, 75)"
          background-color="rgb(84, 92, 100)"
          hover
          mode="horizontal">
          <template
            v-for="(item, key) of header">
            <el-submenu
              :key="key"
              :index="'' + key"
              v-if="item.submenu">
              <template slot="title">{{item.title}}</template>
              <el-menu-item
                v-for="(subItem, subKey) of item.submenu"
                :index="subItem.route"
                :key="subKey">{{subItem.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :key="key"
              :index="item.route">{{item.title}}</el-menu-item>
          </template>
        </el-menu>
      </template>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    header: {
      type: Array,
      required: true
    },
    defaultActive: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      isLogin: false,
      username: ''
    }
  },
  methods: {
    changeArea (index) {
      this.defaultActive = index
      this.$emit('headerChange', index)
    },
    handleLogout () {
      this.$emit('logout')
    }
  },
  computed: {
    loginStatus () {
      return this.isLogin
    }
  },
  activated () {
    const username = sessionStorage.getItem('username')
    if (username) {
      this.username = username
      this.isLogin = true
    }
  }
}
</script>

<style scope lang="stylus">
@import "~styles/variables.styl"
@import "~styles/mixin.styl"
header
  overflow hidden
  background-color rgb(84,92,100)
  margin-bottom 20px
  .role
    position absolute
    left 20px
    color #fff
    line-height 60px
    cursor pointer
  .el-menu
    float left
    margin-left 50%
    transform translateX(-50%)
    background-color rgb(84,92,100)
    .el-menu-item
      line-height 60px
      list-style none
      color #fff
      text-align center
      cursor pointer
      no-wrap()
  .account
    float right
    line-height 60px
    margin-right 20px
    a
      transition all .3s
      text-decoration none
      color #fff
      &:hover
        color rgb(255, 208 75)
    span
      transition all .3s
      color #fff
      cursor pointer
      margin-left 10px
      &:hover
        color rgb(255, 208 75)
</style>
