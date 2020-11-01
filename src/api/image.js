import request from '@/utils/request'

export const uploadIamge = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
