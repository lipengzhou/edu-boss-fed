<template>
  <div class="course-section">
    <el-card>
      <div slot="header">
        课程名称
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
      ></el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson } from '@/services/course-section'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },

  created () {
    this.loadSections()
  },

  methods: {
    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    }
  }
})
</script>

<style lang="scss" scoped></style>
