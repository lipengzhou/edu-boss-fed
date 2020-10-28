<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        <span>课程：xxx</span>
        <br>
        <span>阶段：xxx</span>
        <br>
        <span>课时：xxx</span>
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input type="file">
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file">
        </el-form-item>
        <el-form-item>
          <el-button type="primary">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseVideo'
})
</script>

<style lang="scss" scoped></style>
