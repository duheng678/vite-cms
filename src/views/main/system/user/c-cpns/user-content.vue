<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <!-- <el-button type="primary" @click="handleNewUserClick">新建用户</el-button> -->
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />
        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            <!-- {{ formatUTC(scope.row.createAt) }} -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            <!-- {{ formatUTC(scope.row.updateAt) }} -->
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button size="small" icon="Edit" type="primary" text @click="handleEditBtnClick(scope.row)">
              编辑
            </el-button>
            <el-button size="small" icon="Delete" type="danger" text @click="handleDeleteBtnClick(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
// 定义事件
// const emit = defineEmits(['newClick', 'editClick'])

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
systemStore.postUserListAction()
const { userList } = storeToRefs(systemStore)
watch(userList, (val) => {
  console.log(val)
})

// 2.获取usersList数据,进行展示

// 3.页码相关的逻辑

// 4.定义函数, 用于发送网络请求

// 5.删除/新建/编辑的操作
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>