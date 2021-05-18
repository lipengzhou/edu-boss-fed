import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import advertRoutes from './modules/advert'
import courseRoutes from './modules/course'
import rightsRoutes from './modules/rights'
import userRoutes from './modules/user'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
    },
    {
      path: '/not-permission',
      name: 'not-permission',
      component: () => import('@/views/error-page/403.vue')
    },
    {
      path: '/',
      component: Layout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        }
      ]
    },
    advertRoutes,
    courseRoutes,
    rightsRoutes,
    userRoutes
  ]
})

function hasPermission (permission: string, permissions: any) {
  console.log(permission)
  console.log(permissions)
  // permissions.find(item => {
  //   if (item.href === permission) {
  //     return true
  //   }
  //   if (typeof item.subMenuList === '')
  // })
}

// 全局前置守卫：任何页面的访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
router.beforeEach(async (to, from, next) => {
  // to.matched 是一个数组（匹配到是路由记录）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 没有登录，跳转到登录页
    if (!store.state.user) {
      return next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    }

    // 获取用户角色权限
    const { menuList } = await store.dispatch('getUserPermissions')

    // 遍历权限列表，判断当前访问的路由是否在权限列表中
    hasPermission(to.meta.permission, menuList)

    // 已登录，允许通过
    next()
  } else {
    next() // 允许通过
  }

  // // 路由守卫中一定要调用 next，否则页码无法展示
  // next()
  // if (to.path !== '/login') {
  //   // 校验登录状态
  // }
})

export default router
