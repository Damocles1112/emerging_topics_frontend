import request from '@/utils/request'

export function getPotentialCompanion(keyword) {
  return request({
    url: 'getPotentialCompanion',
    method: 'get',
    params: { keyword }
  })
}
