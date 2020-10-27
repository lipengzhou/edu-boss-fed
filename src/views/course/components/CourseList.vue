<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
        <span>数据筛选</span>
      </div>
      <el-form
        ref="form"
        label-width="70px"
        label-position="left"
        :model="filterParams"
      >
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="filterParams.courseName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterParams.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="loading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            :disabled="loading"
            @click="handleFilter"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header">
        <span>查询结果：</span>
        <el-button
          style="float: right; margin-top: -5px"
          type="primary"
          @click="$router.push({
            name: 'course-create'
          })"
        >添加课程</el-button>
      </div>
      <el-table
        :data="courses"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="上架状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })"
            >编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-section',
                params: {
                  courseId: scope.row.id
                }
              })"
            >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      filterParams: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      courses: [],
      totalCount: 0,
      loading: true
    }
  },

  created () {
    this.loadCourses()
  },

  methods: {
    async loadCourses () {
      this.loading = true
      const { data } = await getQueryCourses(this.filterParams)
      data.data.records.forEach((item: any) => {
        item.isStatusLoading = false
      })
      this.courses = data.data.records
      this.totalCount = data.data.total
      this.loading = false
    },

    handleCurrentChange (page: number) {
      this.filterParams.currentPage = page
      this.loadCourses()
    },

    handleFilter () {
      this.filterParams.currentPage = 1
      this.loadCourses()
    },

    handleReset () {
      (this.$refs.form as Form).resetFields()
      this.filterParams.currentPage = 1
      this.loadCourses()
    },

    async onStateChange (course: any) {
      course.isStatusLoading = true
      await changeState({
        courseId: course.id,
        status: course.status
      })
      this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
      course.isStatusLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
