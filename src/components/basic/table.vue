<template>
  <div class="container">
    <el-table stripe :data="tableData">
      <el-table-column
        v-for="(item, key) of tableInit"
        :key="key"
        :label="item.label"
        :prop="item.prop"
        align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <slot
            :$index="scope.$index"
            :row="scope.row"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'BasicTable',
  props: {
    tableInit: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
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
