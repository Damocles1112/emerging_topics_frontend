import request from '@/utils/request'

export function getTableData(keyword) {
  return request({
    url: 'getTableData',
    method: 'get',
    params: { keyword }
  })
}
