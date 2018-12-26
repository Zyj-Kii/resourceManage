<template>
  <div class="container">
    <ul v-if="category.length > 0">
      <li
        v-for="(item, key) of category"
        :key="key"
        :class="{current: key === activeIndex}">{{item.categoryName}}</li>
    </ul>
  </div>
</template>
<script>
import {ERR_OK} from 'api/config'
export default {
  name: 'SearchResource',
  data () {
    return {
      category: [],
      activeIndex: 0,
      categoryId: -1
    }
  },
  methods: {
    getResource (categoryId, page) {
      const limit = 10
      this.$get('/common/resource/getAllResource', {
        categoryId,
        page,
        limit
      })
        .then(res => {
          console.log(res)
        })
    },
    _resourceInit: async function () {
      try {
        this.categoryId = await this._getCategory()
        this.getResource(this.categoryId, 1)
      } catch (err) {
        console.log(err)
      }
      console.log('a')
    },
    _getCategory () {
      let _resolve
      let _reject
      const promise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
      })
      this.$post('/common/category/getCategory', {
        page: 1,
        limit: 100
      })
        .then(res => {
          if (res.code === ERR_OK) {
            this.category = res.dataList
            console.log('b')
            _resolve(res.dataList[0].categoryId)
          } else {
            _reject(Error('error'))
          }
        })
        .catch(err => {
          _reject(Error(err))
        })
      return promise
    }
  },
  mounted () {
    this._resourceInit()
  }
}
</script>
<style scoped lang="stylus">
@import "~styles/variables"
.container
  width 80%
  margin 10px auto
  min-width 800px
  background-color #f1f1f1
  overflow hidden
  ul
    float left
    border 1px solid #f1f1f1
    background-color #fff
    li
      text-align center
      padding 0 10px
      margin 2px 0
      list-style none
      line-height 1.8
      color $TextColorMain
      cursor pointer
      &.current
        background-color $userBackground
        color #fff
        cursor default
      &:hover
        background-color $userBackground
        color #fff
</style>
