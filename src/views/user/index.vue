<template>
  <div class="user">
    <user-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from './components/UserList.vue'

export default Vue.extend({
  name: 'UserIndex',
  components: {
    UserList
  }
})
</script>

<style lang="scss" scoped></style>
