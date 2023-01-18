import request from '..'
//登陆
export function accountLoginRequest(account: any) {
  return request.post({
    url: '/login',
    data: account,
  })
}

// 请求用户数据
export function getUserInfoById(id: number) {
  return request.get({
    url: `/users/${id}`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}
// 请求用户菜单
export function getUserMenusByRoleId(id: number) {
  return request.get({
    url: `/role/${id}/menu`,
  })
}
