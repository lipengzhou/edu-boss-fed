<template>
  <div class="alloc-menu">分配菜单</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped></style>
