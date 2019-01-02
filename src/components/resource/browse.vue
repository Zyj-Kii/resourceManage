<template>
  <div class="container">
    <ul v-if="category.length > 0">
      <li
        v-for="(item, key) of category"
        :key="key"
        @click="handleCategoryChange(key)"
        :class="{current: key === activeIndex}">
           <el-popover
            placement="left-end"
            width="200"
            trigger="hover"
            :open-delay="300"
            :content="item.categoryDescription">
            <div slot="reference">{{item.categoryName}}</div>
          </el-popover>
        </li>
    </ul>
    <div class="table-wrapper" v-show="tableData">
      <el-table :data="tableData" stripe>
        <el-table-column
          v-for="(item, key) of tableInit"
          align="center"
          :key="key"
          :label="item.title"
          :prop="item.prop"></el-table-column>
        <el-table-column
          label="资源图片"
          align="center"
          >
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              placement="left">
              <img class="maxImg" :src="scope.row.img">
              <img slot="reference" class="img" :src="scope.row.img">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
            type="info"
            size="mini"
            round
            @click="handleDownload(scope.row.resourceFile)"
          >下载<i class="el-icon-download el-icon--right"></i></el-button>
            <template v-if="operation === 'collect'">
              <el-button
                size="mini"
                @click="handleCollect(scope.row.resourceId)"
                type="warning" round>收藏<i class="el-icon-star-off el-icon--right"></i></el-button>
            </template>
            <template v-else-if="operation === 'cancelCollect'">
              <el-button
                size="mini"
                @click="handleCancelCollect(scope.row.collectId)"
                type="warning" round>取消收藏<i class="el-icon-star-off el-icon--right"></i></el-button>
            </template>
            <template v-else>
              <el-button
                size="mini"
                @click="handleDelete(scope.row.resourceId)"
                type="danger" round>删除资源<i class="el-icon-delete el-icon--right"></i></el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-show="total > 0"
      layout="prev, pager, next"
      @current-change="handlePageChange"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :total="total"></el-pagination>
  </div>
</template>
<script>
import {
  getResourceCategory,
  getResource,
  collectResource,
  deleteResource,
  cancelCollect} from 'api/resource'
import { RESOURCE_PAGE_SIZE } from 'common/resource'
import download from 'downloadjs'
export default {
  name: 'ResourceBrowse',
  data () {
    return {
      category: [],
      activeIndex: 0,
      tableData: null,
      total: 0,
      pageSize: RESOURCE_PAGE_SIZE,
      operation: 'download',
      tableInit: [
        {
          title: '资源名称',
          prop: 'resourceName'
        },
        {
          title: '资源描述',
          prop: 'resourceDescription'
        },
        {
          title: '资源等级',
          prop: 'showResourceLevel'
        }
      ]
    }
  },
  methods: {
    handleCategoryChange (index) {
      this.activeIndex = index
      this._getResource(1)
    },
    handleCollect (resourceId) {
      if (this._checkLogin()) {
        collectResource(resourceId)
          .then(() => {
            this.$successToast('收藏资源成功')
          })
          .catch(err => {
            this.$errorToast(err)
          })
      }
    },
    handleCancelCollect (collectId) {
      cancelCollect(collectId)
        .then(() => {
          this.$successToast('取消收藏成功！')
          this._getResource(this.currentPage)
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    handleDelete (resourceId) {
      deleteResource(resourceId)
        .then(() => {
          this.$successToast('删除资源成功！')
          this._getResource(this.currentPage)
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    handlePageChange (page) {
      this._getResource(page)
    },
    reflectLevel (level) {
      switch (level) {
        case 'primary':
          return '初级'
        case 'middle':
          return '中级'
        case 'advanced':
          return '高级'
      }
    },
    handleDownload (url) {
      if (this._checkLogin()) {
        let fileData = url.replace(/\\/g, '/')
        url = this.packUrl(fileData)
        fileData = fileData.split('/')
        let length = fileData.length
        const ext = fileData[length - 1].split('.')[1]
        const filename = fileData[length - 1]
        download(url, filename, ext)
      }
    },
    packUrl (url) {
      return this.$packUrl(url)
    },
    async _resourceInit () {
      try {
        const categoryType = await this._getResourceCategory()
        this.category = categoryType.dataList
        this._getResource(1)
      } catch (err) {
        this.$errorNotify(err)
      }
    },
    _getResource (page) {
      let categoryId
      if (this.category.length > 0) {
        categoryId = this.category[this.activeIndex].categoryId
      } else {
        categoryId = -1
      }
      getResource(categoryId, page)
        .then(res => {
          for (let item of res.dataList) {
            item.img = this.$packUrl(item.resourceImage)
            item.showResourceLevel = this.reflectLevel(item.resourceLevel)
          }
          this.tableData = res.dataList
          this.total = res.databaseSum
        })
        .catch(err => {
          this.tableData = []
          this.$errorToast(err)
        })
    },
    _getResourceCategory () {
      return getResourceCategory()
    },
    _checkLogin () {
      if (!sessionStorage.getItem('username')) {
        this.$errorToast('请先登录')
        return false
      }
      return true
    },
    _setOperation (name) {
      let flag = false
      if (name === 'ResourceBrowse') {
        this._resourceInit()
        this.operation = 'collect'
        return
      } else if (name === 'PrivateCollect') {
        this.operation = 'cancelCollect'
        flag = true
      } else if (name === 'PrivateResource') {
        this.operation = 'delete'
        flag = true
      }
      if (flag) {
        this.category = []
        this._getResource(1)
      }
    }
  },
  mounted () {
    this._setOperation(this.$route.name)
  },
  watch: {
    $route () {
      this._setOperation(this.$route.name)
    }
  },
  created () {
    this.currentPage = -1
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
    margin-right 15px
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
  .table-wrapper
    display flex
    flex 1
    >>> .cell
      overflow visible
    .img
      width 80px
      cursor pointer
    .el-button
      transition all .3s
      &:hover
        transform translateY(-2px)
        box-shadow 2px 2px 5px rgba(0, 0, 0, .3)
      a
        color #fff
        text-decoration none
  .el-pagination
    margin-top 10px
    text-align center
.maxImg
  max-height 800px
</style>
