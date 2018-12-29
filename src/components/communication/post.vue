<template>
  <div class="container">
    <div class="textarea" v-loading="loading">
      <el-input
        :maxlength="maxLength"
        v-model="content"
        :rows="5" type="textarea"
        placeholder="帖子内容"></el-input>
      <span class="count">{{length}}/{{maxLength}}</span>
    </div>
    <el-button @click="handlePost" type="info">发布</el-button>
  </div>
</template>
<script>
import { post } from 'api/communication'
const MAX_LENGTH = 255
export default {
  name: 'CommunicationPost',
  data () {
    return {
      loading: false,
      content: '',
      length: 0,
      maxLength: MAX_LENGTH
    }
  },
  methods: {
    handlePost () {
      this.loading = true
      post(this.content)
        .then(() => {
          this.loading = false
          this.content = ''
          this.$successToast('发布帖子成功')
        })
        .catch(err => {
          this.loading = false
          this.$errorNotify(err)
        })
    }
  },
  watch: {
    content () {
      this.length = this.content.length
    }
  }
}
</script>
<style scoped lang="stylus">
.container
  width 80%
  margin 0 auto
  text-align center
  .textarea
    padding 5px
    position relative
    width 50%
    left 50%
    transform translateX(-50%)
    .count
      position absolute
      right 10px
      bottom 10px
  .el-button
    margin-top 10px
</style>
