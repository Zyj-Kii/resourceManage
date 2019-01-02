<template>
  <div class="box">
    <el-form label-position="right" label-width="90px">
      <el-form-item label="用户名">
        <el-input
          :disabled="true"
          v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio disabled v-model="role" label="admin">管理员</el-radio>
        <el-radio disabled v-model="role" label="user">用户</el-radio>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input
          placeholder="输入旧密码"
          type="password"
          v-model="formData.prePassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          placeholder="新密码"
          type="password"
          v-model="formData.newPassword">
        </el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input
          placeholder="确认新密码"
          type="password"
          v-model="formData.confirmPassword">
        </el-input>
      </el-form-item>
      <el-button @click="submit" type="info">更新密码</el-button>
      <span @click="handleBack" class="back">返回主页</span>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data () {
    return {
      username: '',
      role: '',
      formData: {
        prePassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submit () {
      const formData = this.formData
      if (formData.prePassword.length < 6 || formData.newPassword.length < 6) {
        this.$errorNotify('密码长度不可少于6个字符')
        return false
      } else if (formData.newPassword !== formData.confirmPassword) {
        this.$errorNotify('密码不一致，请重新确认')
        return false
      }
      let url
      let _returnPath
      if (this.role === 'admin') {
        url = '/admin/adminModifyPassword'
        _returnPath = {path: '/admin/index'}
      } else {
        url = '/user/userModifyPassword'
        _returnPath = {path: '/user/resource'}
      }
      this.$post(url, formData)
        .then(res => {
          if (res.code === 2000) {
            this.$successToast('修改密码成功！')
            setTimeout(() => {
              this.$router.push(_returnPath)
            }, 3000)
          } else {
            this.$errorNotify(res.message)
          }
        })
    },
    handleBack () {
      this.$router.go(-1)
    }
  },
  activated () {
    this.username = sessionStorage.username
    this.role = sessionStorage.role
  }
}
</script>

<style lang="stylus" scoped>
.box
  position fixed
  top 50%
  left 50%
  transform translate(-50%,-75%)
  background #fff
  padding 30px
  border-radius 5px
  width 400px
  text-align center
  .toggle
    margin-left 10px
    color #ffa100
  .back
    margin-left 20px
    color #ffa100
    cursor pointer
    font-size 14px
    text-decoration underline
</style>
