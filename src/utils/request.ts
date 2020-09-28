import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 我们就在这里通过改写 config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  // 注意：这里一定要返回 config，否则请求就发不出去了
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) { // 状态码为 2xx 都会进入这里
  // console.log('请求响应成功了 => ', response)
  // 如果是自定义错误状态码，错误处理就写到这里
  return response
}, async function (error) { // 超出 2xx 状态码都都执行这里
  // console.log('请求响应失败了 => ', error)
  // 如果是使用的 HTTP 状态码，错误处理就写到这里
  // console.dir(error)
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效（没有提供 token、token 是无效的、token 过期了）
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 尝试刷新获取新的 token
      try {
        const { data } = await axios.create()({
          method: 'POST',
          url: '/front/user/refresh_token',
          data: qs.stringify({
            refreshtoken: store.state.user.refresh_token
          })
        })
        //   成功了 -> 把本次失败的请求重新发出去
        // 把刷新拿到的新的 access_token 更新到容器和本地存储中
        store.commit('setUser', data.content)
        // 把本次失败的请求重新发出去
        // console.log(error.config) // 失败请求的配置信息
        return request(error.config)
      } catch (err) {
        // 把当前登录用户状态清除
        store.commit('setUser', null)
        //   失败了 -> 跳转登录页重新登录获取新的 token
        redirectLogin()
        return Promise.reject(error)
      }
      // 如果没有，则直接跳转登录页
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }

  // 把请求失败的错误对象继续抛出，扔给上一个调用者
  return Promise.reject(error)
})

export default request
