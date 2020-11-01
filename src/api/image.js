import request from '@/utils/request'

// 上传图片素材
export const uploadIamge = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 获取素材列表
export const getIamge = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
