<template lang="pug">
.text-center.mt-20
  el-button(type="primary", @click="goProgramming") 开始
</template>
<script lang="ts" setup>
const goProgramming = () => {
  navigateTo('/programming')
}
</script>
<style lang="sass">
  
</style>