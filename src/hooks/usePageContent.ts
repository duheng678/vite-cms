import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'
function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()

  const handleQueryClick = (queryInfo = {}) => {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  return { contentRef, handleQueryClick, handleResetClick }
}
export default usePageContent
