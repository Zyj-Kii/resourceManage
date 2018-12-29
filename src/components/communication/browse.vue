<template>
  <div>
    <template v-if="tableData">
      <el-table
        stripe
        size="medium"
        :data="tableData">
        <el-table-column
          v-for="(item, key) of tableInit"
          :key="key"
          align="center"
          :prop="item.prop"
          :label="item.label"></el-table-column>
        <el-table-column
          label="评论"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="info"
              round
              size="mini">查看评论</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getPost } from 'api/communication'
export default {
  name: 'CommunicationBrowse',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    _getPost (page) {
      getPost(page)
        .then(res => {
          for (let item of res.dataList) {
            item.showSendTime = this.$formatTime(item.messageSendTime)
          }
          this.tableData = res.dataList
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    }
  },
  mounted () {
    this._getPost(1)
  },
  created () {
    this.tableInit = [
      {
        label: '用户',
        prop: 'userName'
      },
      {
        label: '正文',
        prop: 'messageContent'
      },
      {
        label: '发布时间',
        prop: 'showSendTime'
      }
    ]
  }
}
</script>
<style scoped lang="stylus">
.el-table
  width 80%
  margin 20px auto 0 auto
  transition all .3s
  border-radius 5px
  &:hover
    transform translateY(-10px)
    box-shadow 0 0 3px 3px rgba(0, 0, 0, 0.1)
</style>
