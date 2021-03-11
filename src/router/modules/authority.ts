import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    title: '权限管理',
    requiresAuth: true
  },
  children: [
    {
      path: '/role',
      name: 'role',
      component: () =>
        import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      meta: {
        title: '角色管理'
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () =>
        import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
      meta: {
        title: '菜单管理'
      }
    },
    {
      path: '/resource',
      name: 'resource',
      component: () =>
        import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
      meta: {
        title: '资源管理'
      }
    },
    {
      path: '/menu/create',
      name: 'menu-create',
      component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'),
      meta: {
        title: '添加菜单'
      }
    },
    {
      path: '/menu/:id/edit',
      name: 'menu-edit',
      component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
    },
    {
      path: '/role/:roleId/alloc-menu',
      name: 'alloc-menu',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
      props: true, // 将路由路径参数映射到组件的 props 数据中
      meta: {
        title: '分配菜单'
      }
    },
    {
      path: '/role/:roleId/alloc-resource',
      name: 'alloc-resource',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
      props: true, // 将路由路径参数映射到组件的 props 数据中
      meta: {
        title: '分配资源'
      }
    }
  ]
}

export default routes
