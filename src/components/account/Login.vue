<template>
    <div>
        <div class="box">
            <el-form label-position="right" label-width="80px">
                <el-form-item label="角色">
                  <el-radio v-model="formData.role" label="admin">管理员</el-radio>
                  <template v-if="isRegister()">
                    <el-radio v-model="formData.role" label="teacher">老师</el-radio>
                    <el-radio v-model="formData.role" label="student">学生</el-radio>
                  </template>
                  <template v-else>
                    <el-radio v-model="formData.role" label="student">用户</el-radio>
                  </template>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input placeholder="输入用户名" v-model="formData.account"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        placeholder="输入密码"
                        type="password"
                        v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" v-show="isRegister()">
                    <el-input
                        placeholder="确认密码"
                        type="password"
                        v-model="formData.confirmPassword">
                    </el-input>
                </el-form-item>
                <el-button @click="submit" type="info">{{type}}</el-button>
                <a @click="swap" href="javascript:void(0)" class="toggle">{{toggle}}</a>
            </el-form>
        </div>
    </div>
</template>

<script>
const HOME = 0
const BACK = 1
export default {
  name: 'Login',
  data () {
    return {
      type: '',
      toggle: '',
      errorMsg: '',
      formData: {
        account: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      },
      status: {
        result: true,
        message: ''
      }
    }
  },
  methods: {
    swap () {
      [this.type, this.toggle] = [this.toggle, this.type]
    },
    isRegister () {
      return this.type === '注册'
    },
    checkRegister () {
      const status = this.status
      const formData = this.formData
      this.checkLogin()
      if (!status.result) {
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        status.result = false
        status.message = '密码不匹配，请再次确认'
      }
      this.showError()
      return status.result
    },
    checkLogin () {
      const status = this.status
      const formData = this.formData
      status.result = true
      if (formData.account === '') {
        status.result = false
        status.message = '账号不能为空'
      } else if (formData.password === '') {
        status.result = false
        status.message = '密码不能为空'
      } else if (formData.password.length < 6 || formData.password.length > 20) {
        status.result = false
        status.message = '密码长度需在6-20之间'
      }
      this.showError()
      return status.result
    },
    showError () {
      const status = this.status
      if (!status.result) {
        this.$errorToast(status.message)
      }
    },
    submit () {
      const formData = this.formData
      if (this.type === '登录' && this.checkLogin()) {
        let url
        let data
        if (formData.role === 'admin') {
          url = '/admin/adminLogin'
          data = {
            adminName: formData.account,
            adminPassword: formData.password
          }
        } else {
          url = '/user/userLogin'
          data = {
            userName: formData.account,
            userPassword: formData.password
          }
        }
        this.$post(url, data)
          .then(
            res => {
              if (formData.role === 'admin') {
                sessionStorage.role = 'admin'
              } else {
                sessionStorage.role = 'user'
              }
              if (sessionStorage.getItem('goback')) {
                sessionStorage.removeItem('goback')
                this.successGo(BACK, '登陆成功')
              } else {
                sessionStorage.username = this.formData.account
                this.successGo(HOME, '登陆成功')
              }
            }
          )
          .catch(error => {
            this.$errorNotify(error)
          })
      } else if (this.checkRegister()) {
        let url
        let data
        if (formData.role === 'admin') {
          url = '/admin/adminRegister'
          data = {
            adminName: formData.account,
            adminPassword: formData.password
          }
        } else {
          url = '/user/userRegister'
          data = {
            userName: formData.account,
            userPassword: formData.password,
            userRole: 'student'
          }
          if (formData.role === 'teacher') {
            data.userRole = 'teacher'
          }
        }
        this.$post(url, data)
          .then(
            res => {
              if (res.code === 2000) {
                this.successGo(HOME, '注册成功')
              } else {
                this.$errorNotify(res.message)
              }
            }
          )
          .catch(error => {
            this.$errorNotify(error)
          })
      }
    },
    successGo (target, message) {
      this.$successToast(message, 1500)
      if (target === HOME) {
        setTimeout(this._goHome, 1500)
      } else {
        setTimeout(this._goBack, 1500)
      }
    },
    _goHome () {
      if (this.formData.role === 'admin') {
        this.$router.push({path: '/admin'})
      } else {
        this.$router.push({path: '/user/resource/browse'})
      }
    },
    _goBack () {
      this.$router.go(-1)
    }
  },
  activated () {
    if (this.$route.path.split('/')[2] === 'signup') {
      this.type = '注册'
      this.toggle = '登录'
    } else {
      this.type = '登录'
      this.toggle = '注册'
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position fixed
  top 50%
  left 50%
  transform translate(-50%,-100%)
  background #fff
  padding 30px
  border-radius 5px
  width 400px
  text-align center
  .toggle
    margin-left 10px
    color #ffa100
</style>
