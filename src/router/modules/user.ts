import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/user',
  component: Layout,
  meta: {
    title: '用户管理',
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'user',
      component: () =>
        import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
      meta: {
        role: 'Users'
      }
    }
  ]
}

export default routes
