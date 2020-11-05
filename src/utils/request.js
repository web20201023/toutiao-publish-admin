/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'
import JSONbig from 'json-bigint'

import router from '@/router'

import { Message } from 'element-ui'
// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 任何请求都经过这里
  // config 可以修改
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('this.user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 相应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const { status } = error.response
  if (status === 401) {
    window.localStorage.removeItem('user')
    Message.error('登录状态无效，请重新登录')
    router.push('./login')
  } else if (status === 403) {
    Message.error('没有操作权限')
  } else if (status === 400) {
    Message.error('请求参数错误')
  } else if (status >= 500) {
    Message.error('服务器内部错误，请稍候重试')
  }
  return Promise.reject(error)
})
// 导出请求方法
export default request
