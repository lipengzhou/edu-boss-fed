import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/role',
  component: Layout,
  meta: {
    title: '权限管理',
    redirect: false,
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'role',
      component: () =>
        import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      meta: {
        title: '角色管理',
        permission: 'Role'
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () =>
        import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
      meta: {
        title: '菜单管理',
        permission: 'Menu'
      }
    },
    {
      path: '/resource',
      name: 'Resource',
      component: () =>
        import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
      meta: {
        title: '资源管理',
        permission: 'Resource'
      }
    },
    {
      path: '/menu/create',
      name: 'AddMenu',
      component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'),
      meta: {
        title: '添加菜单',
        permission: 'AddMenu'
      }
    },
    {
      path: '/menu/:id/edit',
      name: 'UpdateMenu',
      component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'),
      meta: {
        title: '更新菜单',
        permission: 'UpdateMenu'
      }
    },
    {
      path: '/role/:roleId/alloc-menu',
      name: 'AllocMenu',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
      props: true, // 将路由路径参数映射到组件的 props 数据中
      meta: {
        title: '分配菜单',
        permission: 'AllocMenu'
      }
    },
    {
      path: '/role/:roleId/alloc-resource',
      name: 'AllocResource',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
      props: true, // 将路由路径参数映射到组件的 props 数据中
      meta: {
        title: '分配资源',
        permission: 'AllocResource'
      }
    }
  ]
}

export default routes
