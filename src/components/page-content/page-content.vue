<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row.updateAt) }}
              </template></el-table-column
            >
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import useLoginStore from '@/store/login/login'
import usePermission from '@/hooks/usePermission'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { formatUTC } from '@/utils'
interface IProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
// 定义事件
const emit = defineEmits(['newClick', 'editClick'])
const props = defineProps<IProps>()
// 0.判断是否有增删改查的权限
const isCreate = usePermission(props.contentConfig.pageName, 'create')
const isDelete = usePermission(props.contentConfig.pageName, 'delete')
const isUpdate = usePermission(props.contentConfig.pageName, 'update')
const isQuery = usePermission(props.contentConfig.pageName, 'query')
console.log(isQuery)

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const loginStore = useLoginStore()

// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
const { permissions } = storeToRefs(loginStore)
console.log(permissions)

// 3.页码相关的逻辑
const currentPage = ref(1)
const pageSize = ref(10)

const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

// 4.定义函数, 用于发送网络请求
const fetchPageListData = (formData = {}) => {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  const info = { size, offset }
  systemStore.postPageListAction(props.contentConfig.pageName, { ...info, ...formData })
}
fetchPageListData()

// 5.删除/新建/编辑的操作

const handleEditBtnClick = (val: any) => {
  console.log(val)

  emit('editClick', val)
}
const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
  currentPage.value = 1
  pageSize.value = 10
}
const handleNewUserClick = () => {
  emit('newClick')
}
systemStore.$onAction((arg) => {
  arg.after(() => {
    if (arg.name === 'editPageDataAction' || arg.name === 'newPageDataAction') {
      currentPage.value = 1
      pageSize.value = 10
    }
  })
})

defineExpose({ fetchPageListData })
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
