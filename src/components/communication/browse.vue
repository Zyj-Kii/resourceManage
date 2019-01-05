<template>
  <div class="container">
    <basic-table :tableInit="tableInit" :tableData="tableData">
      <template slot-scope="scope">
        <el-button
          :type="buttonType"
          round
          @click="handleGetComment(scope.row.messageId)"
          size="mini">查看评论</el-button>
        <template v-if="operation === 'delete'">
          <el-button
            size="mini"
            @click="handleDelete(scope.row.messageId)"
            type="danger" round>删除帖子<i class="el-icon-delete el-icon--right"></i></el-button>
        </template>
      </template>
    </basic-table>
    <el-pagination
      :total="total"
      layout="prev, pager, next"
      @current-change="handleCurrentPageChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"></el-pagination>
    <el-dialog title="评论" :visible.sync="dialogShow">
      <comment @hideDialog="handleHideDialog" :postId="currentPostId"></comment>
    </el-dialog>
  </div>
</template>
<script>
import BasicTable from 'components/basic/table'
import { getPost, deletePost } from 'api/communication'
import { POST_LIMIT } from 'common/communication'
import { BUTTON_TYPE } from 'common/base'
import Comment from 'components/communication/comment'
export default {
  name: 'CommunicationBrowse',
  data () {
    return {
      tableData: null,
      dialogShow: false,
      buttonType: BUTTON_TYPE,
      currentPostId: 0,
      total: 0,
      operation: 'none'
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
    handleDelete (postId) {
      deletePost(postId)
        .then(() => {
          this.$successToast('删除帖子成功')
          this._getPost(this.currentPage)
        })
        .catch(err => {
          this.$errorNotify(err)
        })
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
    },
    _setTableInit () {
      const name = this.$route.name
      let flag = false
      if (name === 'CommunicationBrowse') {
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
        this.operation = 'none'
        flag = true
      } else if (name === 'PrivatePost') {
        this.tableInit = [
          {
            label: '正文',
            prop: 'messageContent'
          },
          {
            label: '发布时间',
            prop: 'showSendTime'
          }
        ]
        this.operation = 'delete'
        flag = true
      }
      if (flag) {
        this._getPost(1)
      }
    }
  },
  mounted () {
    this._setTableInit()
  },
  created () {
    this.tableInit = []
    this.pageSize = POST_LIMIT
    this.currentPage = -1
  },
  watch: {
    $route () {
      this._setTableInit()
    }
  },
  components: {
    Comment,
    BasicTable
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
