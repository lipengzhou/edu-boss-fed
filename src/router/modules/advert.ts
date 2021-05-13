import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    title: '广告管理',
    requiresAuth: true
  },
  children: [
    {
      path: '/advert',
      name: 'advert',
      component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
      meta: {
        title: '广告列表'
      }
    },
    {
      path: '/advert-space',
      name: 'advert-space',
      component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
      meta: {
        title: '广告位列表'
      }
    }
  ]
}

export default routes
