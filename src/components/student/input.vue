<template>
  <div class="container">
    <el-form
      ref="form"
      :model="formData"
      label-width="80px"
      :rules="rules">
      <el-form-item
        v-for="(item, key) of initForm"
        :key="key"
        :prop="item.prop"
        :label="item.label">
          <el-input v-model="formData[item.prop]"></el-input>
        </el-form-item>
        <el-button
          :type="buttonType"
          @click="inputStudent">录入</el-button>
    </el-form>
  </div>
</template>
<script>
import { BUTTON_TYPE } from 'common/base'
import { inputStudent } from 'api/student'
export default {
  name: 'InputStudent',
  data () {
    return {
      formData: {
        studentName: '',
        studentClass: '',
        studentTeacher: '',
        studentIntroduction: ''
      },
      buttonType: BUTTON_TYPE
    }
  },
  methods: {
    inputStudent () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = this.formData
          inputStudent(formData)
            .then(() => {
              this.$successToast('录入学生信息成功')
              for (let formItem in formData) {
                formData[formItem] = ''
              }
            })
            .catch(err => {
              this.$errorNotify(err)
            })
        }
      })
    }
  },
  created () {
    this.initForm = [
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
    this.rules = {}
    this.formData = {}
    for (let formItem of this.initForm) {
      this.rules[formItem.prop] = [{
        required: true,
        message: `${formItem.prop} 不能为空`,
        trigger: 'blur'
      }]
    }
  }
}
</script>
<style scoped lang="stylus">
.container
  width 20%
  background-color #fff
  margin auto
  text-align center
  padding 30px
  border-radius 5px
</style>
