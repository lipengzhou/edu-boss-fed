<template>
  <el-container>
    <el-aside width="auto">
      <app-aside />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
}

.el-aside {
  position: sticky;
  top: 0;
  max-height: 100vh;
  background: #d3dce6;
}

.el-header {
  background: #f8f9fb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.el-main {
  background: #e9eef3;
}
</style>
