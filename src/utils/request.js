/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'
import JSONbig from 'json-bigint'
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

// 导出请求方法
export default request
