<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="record in records"
      :key="record.path"
    >{{ record.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'
import { RouteRecord } from 'vue-router'

export default Vue.extend({
  name: 'Breadcrumb',
  data () {
    return {
      records: [] as RouteRecord[]
    }
  },
  watch: {
    $route: {
      handler () {
        this.getRecords()
      },
      immediate: true
    }
  },
  methods: {
    getRecords () {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      this.records = matched
    }
  }
})
</script>
