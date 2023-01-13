<template>
  <div class="main">
    <div>main:{{ counterStore.counter }}-{{ counterStore.doubleCounter }}.</div>
    <button @click="changeCounter">改变counter</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
const counterStore = useCounterStore()
const changeCounter = () => {
  counterStore.changeCounterAction(999)
}
</script>

<style scoped lang="less">
.main {
}
</style>
