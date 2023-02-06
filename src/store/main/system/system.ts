import { postUserListData, deleteUserById, newUserData, editUserData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      console.log(userListResult)

      this.userList = userListResult.data.list
      this.userTotalCount = userListResult.data.totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      this.postUserListAction({ size: 10, offset: 0 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
  },
})

export default userSystemStore
