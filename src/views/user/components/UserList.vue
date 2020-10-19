<template>
  <el-card>
    <div slot="header">
      <el-form>
        <el-form-item label="手机号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="头像"
        width="100">
        <template slot-scope="scope">
          <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      users: []
    }
  },

  created () {
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      const { data } = await getUserPages({})
      this.users = data.data.records
    }
  }
})
</script>

<style lang="scss" scoped></style>
