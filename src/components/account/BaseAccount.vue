<template>
    <div class="baseBox">
        <header>五邑大学管理系统</header>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'BaseAccount'
}
</script>

<style lang="stylus" scoped>
@import "~styles/variables.styl"
.baseBox
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f1f1f1
  header
    position fixed
    top 0
    left 0
    right 0
    line-height 60px
    background $bgColor
    color #fff
    text-align center
</style>
