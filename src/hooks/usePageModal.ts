import { ref } from 'vue'
import type pageDialog from '@/components/page-dialog/page-dialog.vue'
type EditFnType = (data: any) => void
function usePageModal(editCallback?: EditFnType) {
  const dialogRef = ref<InstanceType<typeof pageDialog>>()
  const handleNewClick = () => {
    dialogRef.value?.setModalVisible()
  }
  const handleEditClick = (queryInfo: any) => {
    dialogRef.value?.setModalVisible(false, queryInfo)
    if (editCallback) {
      editCallback(queryInfo)
    }
  }
  return { dialogRef, handleNewClick, handleEditClick }
}

export default usePageModal
