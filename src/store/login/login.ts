import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global'
import { mapMenusToRoutes, localCache, mapMenuListToPermissions } from '@/utils'
import useMainStore from '../main/main'
const USER_NAME = 'user/name'

interface ILoginState {
  token: string
  id: string
  name: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    id: '',
    name: '',
    token: '',
    userInfo: {},
    userMenus: {},
    permissions: [],
  }),
  getters: {},
  actions: {
    //登陆逻辑
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      // 登陆失败 返回
      if (!loginRes?.data) return 'error'

      // 保存在store
      this.id = loginRes?.data.id
      this.name = loginRes?.data.name
      this.token = loginRes?.data.token
      // 保存在本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      localCache.setCache(USER_NAME, this.name)
      // 请求用户信息
      const userInfo = await getUserInfoById(Number(this.id))
      console.log(userInfo)
      this.userInfo = userInfo.data
      localCache.setCache('userInfo', this.userInfo)

      // 请求用户菜单
      const userMenus = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenus.data
      localCache.setCache('userMenus', this.userMenus)

      // 获取权限
      const permissions: string[] = mapMenuListToPermissions(this.userMenus)

      this.permissions = permissions

      // 动态路由
      const routes = mapMenusToRoutes(userMenus.data)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })
      // 获取角色
      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      // 跳转路由
      router.push('/')
    },
    // 将本地数据给store
    loadLocalCacheAction() {
      const username = localCache.getCache(USER_NAME)
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (username && token && userInfo && userMenus) {
        this.name = username
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2. 获取按钮权限
        const permissions: string[] = mapMenuListToPermissions(userMenus)
        this.permissions = permissions
        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    },
  },
})

export default useLoginStore
