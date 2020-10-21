<template>
  <div class="course-image">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },

    async handleUpload (options: any) {
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadCourseImage(fd)
      this.$emit('input', data.data.name)
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
