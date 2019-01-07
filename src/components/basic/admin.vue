<template>
  <div>
    <r-header
      @logout="handleLogout"
      :default-active="defaultActive"
      :header="headerList"></r-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>
<script>
import RHeader from 'components/basic/r-header'
import { logout } from 'api/admin'
export default {
  name: 'AdminIndex',
  created () {
    this.defaultActive = '/admin/student/list'
    this.headerList = [
      {
        title: '学生管理',
        submenu: [
          {
            title: '获取学生列表',
            route: '/admin/student/list'
          },
          {
            title: '录入学生信息',
            route: '/admin/student/input'
          }
        ]
      },
      {
        title: '用户查找',
        route: '/admin/student/search'
      },
      {
        title: '资源管理',
        submenu: [
          {
            title: '查看所有资源',
            route: '/admin/resource/browse'
          },
          {
            title: '资源信息',
            route: '/admin/category/info'
          },
          {
            title: '添加资源类型',
            route: '/admin/category/add'
          }
        ]
      },
      {
        title: '交流区管理',
        route: '/admin/communicate/browse'
      }
    ]
  },
  methods: {
    handleLogout () {
      logout()
        .then(() => {
          this.$successToast('退出登录成功')
          sessionStorage.removeItem('role')
          sessionStorage.removeItem('username')
          setTimeout(() => {
            this.$router.push({path: '/account/signin'})
          }, 1500)
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    }
  },
  components: {
    RHeader
  }
}
</script>
