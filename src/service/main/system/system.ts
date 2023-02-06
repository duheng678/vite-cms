import request from '@/service'

export function postUserListData(queryInfo: any) {
  return request.post({
    url: '/users/list',
    data: queryInfo,
  })
}

export function deleteUserById(id: number) {
  return request.delete({
    url: `/users/${id}`,
  })
}
export function newUserData(userInfo: any) {
  return request.post({
    url: '/users',
    data: userInfo,
  })
}

export function editUserData(id: number, userInfo: any) {
  return request.patch({
    url: `/users/${id}`,
    data: userInfo,
  })
}
