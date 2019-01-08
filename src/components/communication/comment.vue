<template>
  <div>
    <el-table stripe :data="commentTable">
      <el-table-column
        v-for="(item, key) of tableInit"
        :key="key"
        :label="item.label"
        :prop="item.prop"
        align="center"></el-table-column>
      <el-table-column align="center" label="评论质量">
        <template slot-scope="scope">
          <i class="el-icon-star-on" :class="{light: scope.row.commentQuality === 1}"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="isAdmin">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.commentQuality === HIGH_QUALITY"
            size="mini"
            type="warning"
            @click="setCommonQuality(scope.$index)"
            round
            >设为普通</el-button>
          <el-button
            v-else
            type="primary"
            round
            @click="setHighQuality(scope.$index)"
            size="mini">设为高质量</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChange"></el-pagination>
    <div class="comment">
      <el-input
        v-model="comment"
        type="textarea"
        :rows="3"
        maxlength="255"
        placeholder="输入你的评论"></el-input>
      <el-button round @click="handleComment" :type="buttonType">发布</el-button>
    </div>
  </div>
</template>
<script>
import { getComment, comment, setCommentQuality } from 'api/communication'
import { COMMENT_LIMIT } from 'common/communication'
import { BUTTON_TYPE } from 'common/base'
const HIGH_QUALITY = 1
const COMMON_QUALITY = 0
export default {
  name: 'CommunicationComment',
  props: {
    postId: {
      type: Number
    }
  },
  data () {
    return {
      commentTable: [],
      comment: '',
      total: 0,
      buttonType: BUTTON_TYPE,
      HIGH_QUALITY: HIGH_QUALITY
    }
  },
  methods: {
    handleComment () {
      if (this.comment !== '') {
        comment(this.postId, this.comment)
          .then(() => {
            this.$successToast('评论成功')
            this.comment = ''
            this._getComment(this.postId, 1)
          })
          .catch(err => {
            this.$emit('hideDialog')
            this.$errorNotify(err)
          })
      } else {
        this.$errorNotify('评论不能为空')
      }
    },
    handlePageChange (page) {
      this._getComment(this.postId, page)
    },
    setHighQuality (index) {
      const commentId = this.commentTable[index].commentId
      setCommentQuality(commentId, HIGH_QUALITY)
        .then(() => {
          this.$successToast('设置为高质量评论成功')
          this.commentTable[index].commentQuality = HIGH_QUALITY
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    setCommonQuality (index) {
      const commentId = this.commentTable[index].commentId
      setCommentQuality(commentId, COMMON_QUALITY)
        .then(() => {
          this.$successToast('设置为普通质量评论成功')
          this.commentTable[index].commentQuality = COMMON_QUALITY
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    _reflectRole (role) {
      switch (role) {
        case 'student':
          return '学生'
        case 'teacher':
          return '教师'
      }
    },
    _getComment (postId, page) {
      getComment(postId, page)
        .then(res => {
          for (let commentItem of res.dataList) {
            commentItem.showCommentTime = this.$formatTime(commentItem.commentTime)
            commentItem.showUserRole = this._reflectRole(commentItem.userRole)
          }
          this.commentTable = res.dataList
          this.total = res.databaseSum
        })
        .catch(() => {})
    }
  },
  watch: {
    postId (newPostId) {
      this.comment = ''
      this.commentTable = []
      this._getComment(newPostId, 1)
    }
  },
  mounted () {
    this._getComment(this.postId, 1)
    if (this.$route.name === 'PostControl') {
      this.isAdmin = true
    }
  },
  created () {
    this.isAdmin = false
    this.tableInit = [
      {
        label: '用户',
        prop: 'userName'
      },
      {
        label: '评论内容',
        prop: 'commentContent'
      },
      {
        label: '身份',
        prop: 'showUserRole'
      },
      {
        label: '评论时间',
        prop: 'showCommentTime'
      }
    ]
    this.pageSize = COMMENT_LIMIT
  }
}
</script>
<style lang="stylus">
.el-icon-star-on
  color rgba(0, 0, 0, 0.1)
  &.light
    color #ffa100
.comment
  .el-button
    margin-top 10px
</style>
