import request from '@/service'

export function postUserListData() {
  return request.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10,
    },
  })
}
