<template>
  <div class="container">
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
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="info"
              round
              @click="handleGetComment(scope.row.messageId)"
              size="mini">查看评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentPageChange"
        :page-size="pageSize"></el-pagination>
    </template>
    <el-dialog title="评论" :visible.sync="dialogShow">
      <comment @hideDialog="handleHideDialog" :postId="currentPostId"></comment>
    </el-dialog>
  </div>
</template>
<script>
import { getPost } from 'api/communication'
import { POST_LIMIT } from 'common/communication'
import Comment from 'components/communication/comment'
export default {
  name: 'CommunicationBrowse',
  data () {
    return {
      tableData: null,
      dialogShow: false,
      currentPostId: 0,
      total: 0
    }
  },
  methods: {
    handleCurrentPageChange (page) {
      this._getPost(page)
    },
    handleGetComment (postId) {
      if (!sessionStorage.getItem('username')) {
        this.$errorToast('登录后才能查看评论')
        return
      }
      this.dialogShow = true
      this.currentPostId = postId
    },
    handleHideDialog () {
      this.dialogShow = false
    },
    _getPost (page) {
      getPost(page)
        .then(res => {
          for (let item of res.dataList) {
            item.showSendTime = this.$formatTime(item.messageSendTime)
          }
          this.tableData = res.dataList
          this.total = res.databaseSum
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
    this.pageSize = POST_LIMIT
  },
  components: {
    Comment
  }
}
</script>
<style scoped lang="stylus">
.container
  text-align center
  .el-table
    width 80%
    margin 20px auto 0 auto
    border-radius 5px
    >>> .el-table__row
      transition all .3s
      &:hover
        transform translateX(10px)
        box-shadow -5px 0 0 rgba(0, 0, 0, 0.3)
  .el-pagination
    margin-top 10px
</style>
