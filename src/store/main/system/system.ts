import { postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
  }),
  actions: {
    async postUserListAction() {
      const userListResult = await postUserListData()
      this.userList = userListResult.data.list
      this.userTotalCount = userListResult.data.totalCount
      console.log(userListResult)
    },
  },
})

export default userSystemStore
