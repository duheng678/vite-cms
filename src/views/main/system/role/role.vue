<template>
  <div class="role">
    <page-search :search-config="searchConfig"></page-search>
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts" name="role">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
</script>

<style scoped>
.role {
}
</style>
