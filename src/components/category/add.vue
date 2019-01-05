<template>
  <div>
    <category-input
      :initForm="initForm"
      :formData="formData"
      @confirm="confirm"></category-input>
  </div>
</template>
<script>
import CategoryInput from 'components/basic/input'
import { addCategory } from 'api/category'
export default {
  data () {
    return {
      initForm: [
        {
          label: '资源类名',
          prop: 'categoryName',
          required: true
        },
        {
          label: '资源描述',
          prop: 'categoryDescription',
          required: true
        }
      ],
      formData: {
        categoryName: '',
        categoryDescription: ''
      }
    }
  },
  methods: {
    confirm () {
      addCategory(this.formData)
        .then(() => {
          this.$successToast('添加资源类型成功')
          this.formData = {
            categoryName: '',
            categoryDescription: ''
          }
        })
        .catch(err => {
          this.$errorNotify(err)
        })
    }
  },
  components: {
    CategoryInput
  }
}
</script>
