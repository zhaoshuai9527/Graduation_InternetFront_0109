import request from '../utils/request'

export function loginUser (data) {
  return request({
    url: '/login/userLogin',
    method: 'get',
    data
  })
}
