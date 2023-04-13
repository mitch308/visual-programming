<script setup lang="ts">
import { useMenuStore } from '../../store/menuStore';
const menuStore = useMenuStore()

const formData = reactive({
  title: menuStore.currentMenu?.title,
  path: menuStore.currentMenu?.path
})
</script>

<template lang="pug">
el-form.page-info.px-2(:model="formData")
  el-form-item(label="页面名称", prop="title")
    el-input(v-model="formData.title")
  el-form-item(label="页面路径", prop="path")
    el-input(v-model="formData.path")
</template>

<style lang="scss" scoped>
</style>
