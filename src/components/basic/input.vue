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
          @click="confirm">录入</el-button>
    </el-form>
  </div>
</template>
<script>
import { BUTTON_TYPE } from 'common/base'
export default {
  name: 'InputStudent',
  props: {
    formData: {
      type: Object,
      required: true
    },
    initForm: {
      type: Array,
      required: true
    }
  },
  methods: {
    confirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('confirm')
        }
      })
    }
  },
  created () {
    this.rules = {}
    for (let formItem of this.initForm) {
      if (formItem.required === false) {
        continue
      }
      this.rules[formItem.prop] = [{
        required: true,
        message: `${formItem.prop} 不能为空`,
        trigger: 'blur'
      }]
    }
    this.buttonType = BUTTON_TYPE
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
