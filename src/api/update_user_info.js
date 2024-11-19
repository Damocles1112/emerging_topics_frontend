import request from '@/utils/request'

export function updateUserInfo(keyword) {
  return request({
    url: 'updateUserInfo',
    method: 'get',
    params: { keyword }
  })
}
