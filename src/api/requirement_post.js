import request from '@/utils/request'

export function searchCompanion(requirements) {
  return request({
    url: 'searchCompanion',
    method: 'get',
    params: { requirements }
  })
}
