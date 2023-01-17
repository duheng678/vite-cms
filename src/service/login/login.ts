import request from '..'

export function accountLoginRequest(account: any) {
  return request.post({
    url: '/login',
    data: account,
  })
}
