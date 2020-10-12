<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <span>筛选搜索</span> -->
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="loading"
            >查询搜索</el-button>
            <el-button
              :disabled="loading"
              @click="onReset"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button>添加角色</el-button>
      <el-table
        :data="roles"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <div>
              <el-button type="text">分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoles } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      roles: [], // 角色列表
      form: {
        current: 1,
        size: 50,
        name: ''
      }, // 查询条件
      loading: false
    }
  },

  created () {
    this.loadRoles()
  },

  methods: {
    async loadRoles () {
      this.loading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.loading = false
    },

    onSubmit () {
      this.loadRoles()
    },

    handleEdit (role: any) {
      console.log(role)
    },

    handleDelete (role: any) {
      console.log(role)
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.loadRoles()
    }
  }
})
</script>

<style lang="scss" scoped></style>
