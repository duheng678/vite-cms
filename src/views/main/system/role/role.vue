<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-dialog :modal-config="dialogConfig" :other-info="otherInfo" ref="dialogRef">
      <template #menulist>
        <!-- :default-checked-keys="defaultChecked" -->
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-dialog>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageDialog from '@/components/page-dialog/page-dialog.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/modal.config'

import useMainStore from '@/store/main/main'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { mapMenuListToIds } from '@/utils'
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const treeRef = ref<InstanceType<typeof ElTree>>()

const editCallback = (val: any) => {
  console.log(val)
  nextTick(() => {
    treeRef.value!.setCheckedKeys(mapMenuListToIds(val.menuList))
  })
}

const otherInfo: any = ref()
const handleCheckChange = (val: any, totalVal: any) => {
  const { checkedKeys, halfCheckedKeys } = totalVal
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  console.log(menuList)
  otherInfo.value = { menuList }
}

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { dialogRef, handleEditClick, handleNewClick } = usePageModal(editCallback)
</script>

<style scoped>
.role {
}
</style>
