<template>
  <div class="user">
    <user-search></user-search>

    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
function handleNewClick() {}
function handleEditClick() {}
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
