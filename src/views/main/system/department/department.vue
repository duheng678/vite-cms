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
    <page-dialog :modal-config="modalConfigRef" ref="dialogRef"></page-dialog>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { ref, computed } from 'vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { dialogRef, handleEditClick, handleNewClick } = usePageModal()

const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  const departments = mainStore.entireDepartments.map((item) => ({ label: item.name, value: item.id }))
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})
</script>

<style scoped>
.department {
}
</style>
