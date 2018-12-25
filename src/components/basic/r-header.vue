<template>
  <div>
    <header>
      <div class="account">
        <router-link to="/account/modify">修改密码</router-link>
        <span @click="handleLogout">退出登录</span>
      </div>
      <ul>
          <li
            v-for="(item, key) of header"
            :key="key"
            @click="changeArea(key)"
            :class="{current: key === active}">{{item.title}}</li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    header: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    changeArea (index) {
      this.active = index
      this.$emit('headerChange', index)
    },
    handleLogout () {
      this.$emit('logout')
    }
  }
}
</script>

<style scope lang="stylus">
@import "~styles/variables.styl"
@import "~styles/mixin.styl"
*
  margin 0
  padding 0
  header
    overflow hidden
    background-color $bgColor
    ul
      overflow hidden
      width 40%
      margin 0 auto
      li
        transition all .3s
        float left
        width 50%
        line-height 60px
        list-style none
        color #fff
        text-align center
        cursor pointer
        no-wrap()
        &.current
          cursor default
          transform scale(1.5)
    .account
      float right
      line-height 60px
      margin-right 20px
      a
        transition all .3s
        text-decoration none
        color #fff
        &:hover
          color #000
      span
        transition all .3s
        color #fff
        cursor pointer
        margin-left 10px
        &:hover
          color #000
</style>
