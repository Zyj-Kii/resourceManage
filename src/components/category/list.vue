<template>
  <div class="container">
    <basic-table :tableData="tableData" :tableInit="initTable">
      <template slot-scope="scope">
        <el-button
          :type="buttonType"
          round
          size="small"
          @click="handleEdit(scope.$index)">编辑 <i class="el-icon-edit el-icon--right"></i>
        </el-button>
        <el-button
          round
          type="danger"
          size="small"
          @click="deleteCategory(scope.row.categoryId)">删除 <i class="el-icon-delete el-icon--right"></i></el-button>
      </template>
    </basic-table>
    <el-pagination
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"></el-pagination>
    <el-dialog
      :visible.sync="editDialogShow"
      width="20%">
      <edit
        :initForm="initTable"
        :currentData="currentData"
        @hiddenDialog="hiddenDialog"
        @confirmForm="confirmEditForm"></edit>
    </el-dialog>
  </div>
</template>
<script>
import Edit from 'components/basic/edit'
import BasicTable from 'components/basic/table'
import { getResourceCategory, deleteCategory, modifyCategory } from 'api/category'
import { CATEGORY_SIZE } from 'common/category'
import { BUTTON_TYPE } from 'common/base'
export default {
  name: 'ResourceCategory',
  data () {
    return {
      tableData: [],
      editIndex: -1,
      buttonType: BUTTON_TYPE,
      total: -1,
      pageSize: CATEGORY_SIZE,
      editDialogShow: false,
      currentData: null,
      currentPage: -1
    }
  },
  methods: {
    handlePageChange (page) {
      this._getResourceCategory(page)
    },
    hiddenDialog () {
      this.editDialogShow = false
    },
    handleEdit (index) {
      this.editIndex = index
      this.currentData = Object.assign({}, this.tableData[index])
      this.editDialogShow = true
    },
    deleteCategory (categoryId) {
      deleteCategory(categoryId)
        .then(() => {
          this.$successToast('删除资源类型成功')
          this._getResourceCategory(this.currentPage)
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    confirmEditForm () {
      modifyCategory(this.currentData)
        .then(() => {
          this.$set(this.tableData, this.editIndex, this.currentData)
          this.editDialogShow = false
          this.$successToast('修改资源信息成功')
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    _getResourceCategory (page) {
      getResourceCategory(page, CATEGORY_SIZE)
        .then(res => {
          this.tableData = res.dataList
          this.total = res.databaseSum
        })
    }
  },
  created () {
    this.initTable = [
      {
        label: '资源名称',
        prop: 'categoryName'
      },
      {
        label: '资源描述',
        prop: 'categoryDescription'
      }
    ]
  },
  mounted () {
    this._getResourceCategory(1)
  },
  components: {
    Edit,
    BasicTable
  }
}
</script>
<style lang="stylus">
.container
  width 80%
  margin auto
  text-align center
  .el-pagination
    margin-top 10px
</style>
