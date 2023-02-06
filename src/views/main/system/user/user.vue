<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>

    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
const modalRef = ref<InstanceType<typeof userModal>>()
// 新建
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
// 编辑
function handleEditClick(val: any) {
  modalRef.value?.setModalVisible(false, val)
}
const contentRef = ref<InstanceType<typeof userContent>>()
const handleQueryClick = (val = {}) => {
  contentRef.value?.fetchUserListData(val)
}
const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
