<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in breadList"
      :key="index"
    >
      <span v-if="item.meta.redirect === false || index === breadList.length - 1">{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleBreadLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'
import { RouteRecord } from 'vue-router'
import { compile } from 'path-to-regexp'

export default Vue.extend({
  name: 'AppBreadcrumb',
  computed: {
    breadList () {
      return this.$route.matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
    }
  },
  methods: {
    handleBreadLink (route: RouteRecord) {
      const toPath = compile(route.path)
      const path = toPath(this.$route.params)
      this.$router.push(path)
    }
  }
})
</script>
