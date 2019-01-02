<template>
  <div>
    <r-header
      :default-active="defaultActive"
      :header="headerList"></r-header>
  </div>
</template>
<script>
import RHeader from 'components/basic/r-header'
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
        title: '用户管理',
        submenu: [
          {
            title: '用户名查找',
            route: '/admin/search/username'
          },
          {
            title: '班级查找',
            route: '/admin/search/class'
          }
        ]
      }
    ]
  },
  components: {
    RHeader
  }
}
</script>
