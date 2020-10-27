import Vue from 'vue'
import Vuex from 'vuex'
import { getUserPermissions } from '@/services/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    // user: null // 当前登录用户状态
    menuList: [], // 权限菜单
    resourceList: [] // 权限资源
  },
  mutations: {
    // 修改容器数据必须使用 mutation 函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止页面刷新数据丢失，我们需要把 user 数据持久化
      // 注意：本地存储只能存字符串
      window.localStorage.setItem('user', payload)
    },

    SET_MENU_LIST (state, payload) {
      state.menuList = payload
    },

    SET_RESOURCE_LIST (state, payload) {
      state.resourceList = payload
    }
  },
  actions: {
    async getUserPermissons ({ commit }) {
      const { data } = await getUserPermissions()
      commit('SET_MENU_LIST', data.content.menuList)
      commit('SET_RESOURCE_LIST', data.content.resourceList)
      return data
    }
  },
  modules: {
  }
})
