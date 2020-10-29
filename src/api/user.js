import request from '@/utils/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = data => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    headers: {
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU0MTA0MTIsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.GQMqRiJcY50_DjEUPH_BFikkym1H1-o8e4gePcCUwdU'
    }
  })
}
