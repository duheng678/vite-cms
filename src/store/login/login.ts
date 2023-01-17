import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const LOGIN_TOKEN = 'login/token'
const USER_NAME = 'user/name'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: localCache.getCache(USER_NAME) ?? '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
  }),
  getters: {},
  actions: {
    async loginAccountAction(account: IAccount) {
      console.log('h')
      const loginRes = await accountLoginRequest(account)
      // 保存在store
      this.id = loginRes?.data.id
      this.name = loginRes?.data.name
      this.token = loginRes?.data.token
      // 保存在本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      localCache.setCache(USER_NAME, this.name)
      console.log(this.id, this.name, this.token)
    },
  },
})

export default useLoginStore
