import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import authorityRoutes from './authority'
import courseRoutes from './course'
import userRoutes from './user'
import advertRoutes from './advert'

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
      requiresAuth: true
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      }
    ]
  },
  authorityRoutes,
  courseRoutes,
  userRoutes,
  advertRoutes,
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue'),
    meta: {
      hidden: true
    }
  }
]

export default routes
