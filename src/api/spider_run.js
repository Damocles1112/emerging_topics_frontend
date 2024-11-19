import request from '@/utils/request'

export function sendKeyword(weibo_keyword){
  return request({
    url: 'search',
    method: 'get',
    params: { weibo_keyword }
  })
}
