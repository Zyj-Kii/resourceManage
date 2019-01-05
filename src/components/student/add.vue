<template>
  <div>
    <student-input
      :initForm="initForm"
      :formData="formData"
      @confirm="confirm"></student-input>
  </div>
</template>
<script>
import StudentInput from 'components/basic/input'
import { inputStudent } from 'api/student'
export default {
  name: 'AddStudent',
  data () {
    return {
      initForm: [
        {
          label: '姓名',
          prop: 'studentName',
          required: true
        },
        {
          label: '班级',
          prop: 'studentClass',
          required: true
        },
        {
          label: '班导师',
          prop: 'studentTeacher',
          required: false
        },
        {
          label: '简介',
          prop: 'studentIntroduction',
          required: true
        }
      ],
      formData: {
        studentName: '',
        studentClass: '',
        studentTeacher: '',
        studentIntroduction: ''
      }
    }
  },
  methods: {
    confirm () {
      inputStudent(this.formData)
        .then(() => {
          this.$successToast('录入学生信息成功')
          this.formData = {
            studentName: '',
            studentClass: '',
            studentTeacher: '',
            studentIntroduction: ''
          }
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    }
  },
  components: {
    StudentInput
  }
}
</script>
