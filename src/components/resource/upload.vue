<template>
  <div class="form-wrapper">
    <el-form
      v-loading="loading"
      ref="form"
      :model="formData"
      label-width="80px"
      label-position="right">
      <el-form-item label="资源类型">
        <el-select v-if="selectOption" v-model="formData.categoryId">
          <el-option
            v-for="(item, key) of selectOption"
            :key="key"
            :label="item.categoryName"
            :value="item.categoryId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(item, key) of inputFiled"
        :key="key"
        :label="item.label">
        <el-input :type="item.type ? item.type : ''" v-model="formData[item.model]"></el-input>
      </el-form-item>
      <el-form-item label="资源截图">
        <el-upload
          action="//garycheung97.xin"
          list-type="picture-card"
          ref="img"
          :on-preview="handlePictureCardPreview"
          :multiple="false"
          :limit="1"
          :on-change="imgChange"
          :on-exceed="handleOverchoose"
          :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="资源文件">
        <el-upload
          ref="file"
          drag
          action="//garycheung97.xin"
          :multiple="false"
          :limit="1"
          :on-change="fileChange"
          :on-exceed="handleOverchoose"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">文件大小不能超过500k</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleUpload" :type="buttonType">上传</el-button>
      </el-form-item>
    </el-form>
    <el-dialog top="10px" width="30%" :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%">
    </el-dialog>
  </div>
</template>
<script>
import { upload } from 'api/resource'
import { getResourceCategory } from 'api/category'
import { BUTTON_TYPE } from 'common/base'
export default {
  name: 'ResourceUpload',
  data () {
    return {
      selectOption: null,
      loading: false,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: false,
      inputFiled: [
        {
          label: '资源名称',
          model: 'resourceName'
        },
        {
          label: '资源描述',
          model: 'resourceDescription',
          type: 'textarea'
        }
      ],
      formData: {
        categoryId: '',
        resourceName: '',
        resourceDescription: '',
        resourceImage: '',
        resourceFile: ''
      },
      buttonType: BUTTON_TYPE
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleOverchoose () {
      this.$errorToast('只能选择一个文件，更换请先删除前一个文件！')
    },
    handleUpload () {
      let formdata = new FormData()
      const _formData = this.formData
      for (let key in _formData) {
        if (!_formData[key]) {
          this.$errorToast(`${key} 字段不能为空，请确认`)
          return
        } else {
          formdata.append(key, _formData[key])
        }
      }
      this.loading = true
      upload(formdata)
        .then(() => {
          for (let key in _formData) {
            _formData[key] = ''
          }
          this.$refs.img.clearFiles()
          this.$refs.file.clearFiles()
          this.loading = false
          this.$successToast('上传资源成功！')
        })
        .catch(err => {
          console.log(err)
          this.loading = false
          this.$errorNotify(err)
        })
    },
    imgChange (file) {
      if (this.sizeLowerCompare(file.size, 0.5)) {
        this.formData.resourceImage = file.raw
      } else {
        this.$errorToast('上传图片不能超过500K')
        this.$refs.img.clearFiles()
      }
    },
    fileChange (file) {
      if (this.sizeLowerCompare(file.size, 0.5)) {
        this.formData.resourceFile = file.raw
      } else {
        this.$errorToast('上传文件不能超过500K')
        this.$refs.file.clearFiles()
      }
    },
    sizeLowerCompare (size, level = 2) {
      return size < 1024 * 1024 * level
    }
  },
  mounted () {
    getResourceCategory()
      .then(res => {
        this.formData.categoryId = res.dataList[0].categoryId
        this.selectOption = res.dataList
      })
  }
}
</script>
<style scoped lang="stylus">
  .form-wrapper
    width 50%
    margin 30px auto 0 auto
    .el-form
      width 50%
      margin 0 auto
      transition all .5s
      background-color #fff
      padding 10px 30px
      border-radius 5px
      &:hover
        box-shadow 0 0 5px 5px rgba(0, 0, 0, .1)
        transform translate3d(0, -10px, 0)
      .el-upload__tip
        margin-top -15px
      .el-button
        margin 0 auto
</style>
