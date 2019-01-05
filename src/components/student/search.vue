<template>
  <div class="container">
    <el-radio-group v-model="searchType" size="small">
      <el-radio-button label="username">用户名查找</el-radio-button>
      <el-radio-button label="classes">班级查找</el-radio-button>
    </el-radio-group>
    <div class="formContainer" v-show="byUsername">
      <el-form label-width="80px" label-position="right">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="username"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="formContainer" v-show="!byUsername">
      <el-form label-width="80px" label-position="right">
        <el-form-item label="班级">
          <el-input placeholder="请输入班级" v-model="classes"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="search" :type="buttonType">查找</el-button>
    <template v-if="tableData.length > 0">
      <base-table :tableInit="tableInit" :tableData="tableData">
        <template slot-scope="scope">
          <template v-if="scope !== FORBIDDEN">
            <el-button
              type="danger"
              round
              size="small"
              @click="forbiddenPost(scope)">禁止发帖 <i class="el-icon-error el-icon--right"></i>
            </el-button>
          </template>
          <template v-else>
            <el-button
              type="success"
              round
              size="small"
              @click="allowPost(scope)">允许发帖 <i class="el-icon-success el-icon--right"></i>
            </el-button>
          </template>
        </template>
      </base-table>
    </template>
  </div>
</template>
<script>
import { BUTTON_TYPE } from 'common/base'
import { FORBIDDEN } from 'common/student'
import { searchStudent } from 'api/student'
import BaseTable from 'components/basic/table'
export default {
  name: 'SearchStudent',
  data () {
    return {
      searchType: 'username',
      username: '',
      classes: '',
      buttonType: BUTTON_TYPE,
      tableInit: [
        {
          label: '用户名',
          prop: 'userName'
        },
        {
          label: '身份',
          prop: 'userRole'
        }
      ],
      tableData: []
    }
  },
  methods: {
    search () {
      const field = this[this.searchType]
      if (field === '') {
        this.$errorToast('输入不能为空')
        return
      }
      searchStudent(this.searchType, field)
        .then(res => {
          this.$successToast('查找成功')
          this.tableData = res.dataList
          console.log(res)
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    },
    forbiddenPost (id) {
      console.log(id)
    },
    allowPost (id) {
      console.log(id)
    }
  },
  computed: {
    byUsername () {
      return this.searchType === 'username'
    }
  },
  created () {
    this.FORBIDDEN = FORBIDDEN
  },
  components: {
    BaseTable
  }
}
</script>
<style scoped lang="stylus">
.container
  width 80%
  margin auto
  background-color #fff
  text-align center
  padding 10px
  border-radius 5px
  .el-radio-group
    margin-bottom 10px
  .formContainer
    width 20%
    margin auto
</style>
