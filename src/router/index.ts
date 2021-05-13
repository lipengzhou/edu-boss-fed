import Vue from 'vue'
import VueRouter from 'vue-router'
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

    // 校验页面访问权限
    // await store.dispatch('getUserInfo')
    const { content: { menuList } } = await store.dispatch('getUserPermissons')

    console.log(menuList)

    // const role = to.meta.role

    // for (let i = 0; i < menuList.length; i++) {
    //   const item = menuList[i]
    //   if (item.href === role) {
    //     // 生成权限菜单
    //     return next()
    //   }
    //   if (item.subMenuList) {
    //     for (let j = 0; j < item.subMenuList.length; j++) {
    //       const subIitem = item.subMenuList[j]
    //       if (subIitem.href === role) {
    //         // 生成权限菜单
    //         return next()
    //       }
    //     }
    //   }
    // }

    // 没有权限跳转到 403 页面
    // return next('/permission-denied')
  }

  // 不需要认证的页面，直接通过访问
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
