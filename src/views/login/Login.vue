<template>
  <div class="login">
    <div>login</div>
  </div>
</template>

<script setup lang="ts">
import request from '@/service'
console.log(request)

request.get({ url: '/home/multidata' }).then((res) => {
  console.log(res)
})
</script>

<style scoped lang="less">
.login {
}
</style>
