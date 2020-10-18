<template>
  <div class="alloc-menu">
    <el-tree
      :data="menus"
      :props="defaultProps"
      show-checkbox
      default-expand-all
    ></el-tree>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList } from '@/services/menu'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },

  created () {
    this.loadMenus()
  },

  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    }
  }
})
</script>

<style lang="scss" scoped></style>
