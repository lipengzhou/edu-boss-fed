<template>
  <div class="aside">
    <router-link class="logo" to="/" title="Back to Home">
      <img src="./logo.png" alt="LagouEdu">
      <h1>Edu Boss</h1>
    </router-link>
    <MenuList/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuList from '@/components/MenuList/index.vue'

export default Vue.extend({
  name: 'AppAside',
  components: {
    MenuList
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },

    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.aside {
  .logo {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #545c64;
    color: #fff;
    text-decoration: none;
    img {
      width: 40px;
    }
  }
  .el-menu {
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
}
</style>
