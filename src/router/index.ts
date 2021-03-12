import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './modules'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  // to.matched 是一个数组（匹配到是路由记录）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      return next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    }
  }

  // 获取用户权限
  // const data = await store.dispatch('getUserPermissons')
  // 判断当前请求路径是否在权限菜单中
  // 在 -> 通过
  // 不在 -> 跳转到没有权限页面
  // console.log(data)

  next()
})

router.afterEach(() => {
  nprogress.done()
})

// 全局前置守卫：任何页面的访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
// router.beforeEach((to, from, next) => {
//   // to.matched 是一个数组（匹配到是路由记录）
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.state.user) {
//       // 跳转到登录页面
//       next({
//         name: 'login',
//         query: { // 通过 url 传递查询字符串参数
//           redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
//         }
//       })
//     } else {
//       next() // 需要登录验证通过
//     }
//   } else {
//     next() // 不需要登录允许通过
//   }
// })

export default router
