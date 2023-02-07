<template>
  <div class="department">
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
      ><template #leader="scope"> {{ scope.row[scope.prop] }} </template>
    </page-content>
    <page-dialog :modal-config="modalConfig" ref="dialogRef"></page-dialog>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof pageContent>>()
const handleQueryClick = (queryInfo = {}) => {
  contentRef.value?.fetchPageListData(queryInfo)
}
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}

const dialogRef = ref<InstanceType<typeof pageDialog>>()
const handleNewClick = () => {
  dialogRef.value?.setModalVisible()
}
const handleEditClick = (queryInfo: any) => {
  dialogRef.value?.setModalVisible(false, queryInfo)
}
</script>

<style scoped>
.department {
}
</style>
