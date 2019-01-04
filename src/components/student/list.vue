<template>
  <div class="container">
    <template v-if="tableData">
      <el-table :data="tableData">
        <el-table-column
          v-for="(item, key) of tableInit"
          :key="key"
          :label="item.label"
          :prop="item.prop"
          align="center"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              :type="buttonType"
              round
              @click="handleEdit(scope.$index)">编辑 <i class="el-icon-edit el-icon--right"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      v-show="total > 0"
      layout="prev, pager, next"
      @current-change="handlePageChange"
      :page-size="pageSize"
      :total="total"></el-pagination>
    <el-dialog
      :visible.sync="editDialogShow"
      width="20%">
      <edit
        :initForm="initEditForm"
        :currentData="currentData"
        @hiddenDialog="hiddenDialog"
        @confirmForm="confirmEditForm"></edit>
    </el-dialog>
  </div>
</template>
<script>
import Edit from 'components/student/edit'
import { getStudentList, editStudent } from 'api/student'
import { STUDENT_LIMIT } from 'common/student'
import { BUTTON_TYPE } from 'common/base'
export default {
  name: 'StudentList',
  data () {
    return {
      tableData: null,
      total: 0,
      pageSize: STUDENT_LIMIT,
      buttonType: BUTTON_TYPE,
      editDialogShow: false,
      currentData: null,
      editIndex: -1
    }
  },
  methods: {
    handlePageChange (page) {
      this._getStudentList(page)
    },
    handleEdit (index) {
      this.editIndex = index
      this.currentData = Object.assign({}, this.tableData[index])
      this.editDialogShow = true
    },
    hiddenDialog () {
      this.editDialogShow = false
    },
    confirmEditForm () {
      editStudent(this.currentData)
        .then(() => {
          this.$successToast('修改学生信息成功')
          this.$set(this.tableData, this.editIndex, this.currentData)
          this.editDialogShow = false
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    _getStudentList (page) {
      getStudentList(page)
        .then(res => {
          this.tableData = res.dataList
          this.total = res.databaseSum
        })
    }
  },
  mounted () {
    this._getStudentList(1)
  },
  created () {
    this.tableInit = [
      {
        label: '姓名',
        prop: 'studentName'
      },
      {
        label: '班级',
        prop: 'studentClass'
      },
      {
        label: '班导师',
        prop: 'studentTeacher'
      },
      {
        label: '简介',
        prop: 'studentIntroduction'
      }
    ]
    this.initEditForm = [
      {
        label: '班级',
        prop: 'studentClass'
      },
      {
        label: '班导师',
        prop: 'studentTeacher'
      },
      {
        label: '简介',
        prop: 'studentIntroduction'
      }
    ]
  },
  components: {
    Edit
  }
}
</script>
<style lang="stylus" scoped>
.container
  width 80%
  margin auto
  text-align center
  .el-pagination
    margin-top 10px
</style>
