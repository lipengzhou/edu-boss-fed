<template>
  <div>
    <el-form>
      <el-form-item label="角色名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CreateOrEditRole'
})
</script>

<style lang="scss" scoped></style>
