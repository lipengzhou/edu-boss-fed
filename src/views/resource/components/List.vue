<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          width="180"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },

  created () {
    this.loadResources()
  },

  methods: {
    async loadResources () {
      const { data } = await getResourcePages({
        // 查询条件
      })
      this.resources = data.data.records
    },

    onSubmit () {
      console.log('submit!')
    },

    handleEdit (item: any) {
      console.log('handleEdit', item)
    },

    handleDelete (item: any) {
      console.log('handleDelete', item)
    }
  }
})
</script>

<style lang="scss" scoped></style>
