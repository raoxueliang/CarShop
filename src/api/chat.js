import url from './index'
import request from '@/utils/request'

export function sendMsg(data) {
  return request({
    url: url.baseUrl+'/sendMsg',
    method: 'get',
    params:{sendFrom:data.sendFrom,sendTo:data.sendTo,msg: data.msg}
  })
}
