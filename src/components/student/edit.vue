<template>
  <div>
    <el-form>
      <el-form-item
        label-width="80px"
        v-for="(item, key) of initForm"
        :key="key"
        :label="item.label">
        <el-input v-model="currentData[item.prop]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hiddenDialog">取 消</el-button>
      <el-button :type="buttonType" @click="confirmForm">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { BUTTON_TYPE } from 'common/base'
export default {
  name: 'StudentEdit',
  props: {
    initForm: {
      type: Array,
      required: true
    },
    currentData: {
      required: true
    }
  },
  data () {
    return {
      buttonType: BUTTON_TYPE
    }
  },
  methods: {
    hiddenDialog () {
      this.$emit('hiddenDialog')
    },
    confirmForm () {
      const currentData = this.currentData
      for (let formKey in currentData) {
        if (currentData[formKey] === '') {
          this.$errorToast(`${formKey} 字段不能留空`)
          return false
        }
      }
      this.$emit('confirmForm')
    }
  }
}
</script>
