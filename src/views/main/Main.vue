<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '65px' : '210px'">
        <main-menu :isFold="isFold"></main-menu>
      </el-aside>

      <el-container>
        <el-header height="50px">
          <main-header @foldChange="handleFoldChange"></main-header>
        </el-header>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'

import MainMenu from '@/components/main-menu'
import MainHeader from '@/components/main-header'

const router = useRouter()

const isFold = ref(false)
const handleFoldChange = () => {
  isFold.value = !isFold.value
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
// :global(.el-main) {
//   padding: 0;
// }
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
