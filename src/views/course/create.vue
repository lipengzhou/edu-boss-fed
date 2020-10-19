<template>
  <div class="course-create">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            :title="item.title"
            :icon="item.icon"
            v-for="(item, index) in steps"
            :key="index"
            @click.native="activeStep = index"
          ></el-step>
          <!-- <el-step title="课程封面" icon="el-icon-upload"></el-step>
          <el-step title="销售信息" icon="el-icon-picture"></el-step>
          <el-step title="秒杀活动" icon="el-icon-picture"></el-step>
          <el-step title="课程详情" icon="el-icon-picture"></el-step> -->
        </el-steps>
      </div>
      <el-form>
        <div v-show="activeStep === 0">
          基本信息
        </div>
        <div v-show="activeStep === 1">
          课程封面
        </div>
        <div v-show="activeStep === 2">
          销售信息
        </div>
        <div v-show="activeStep === 3">
          秒杀活动
        </div>
        <div v-show="activeStep === 4">
          课程详情
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseCreate',
  data () {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '销售信息', icon: 'el-icon-edit' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
