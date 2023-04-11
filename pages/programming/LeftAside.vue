<template lang="pug">
.left-aside.w-48.flex.flex-col.border-r
  .menu-title.py-2.px-3.border-b.flex.items-center.cursor-pointer(@click="addMenu")
    span.flex-1 菜单列表
    el-icon(size="14")
      Plus
  el-menu.flex-1
    SubMenuList(:menu-list="pageList")
MenuDialog(ref="menuDialogRef")
</template>

<script setup lang="ts">
import SubMenuList from './SubMenuList.vue';
import MenuDialog from './MenuDialog.vue';

// 获取菜单列表
const {data: pageList, refresh: refreshPageList} = await useFetch('/api/pages/getList')

const menuDialogRef = ref<InstanceType<typeof MenuDialog> | null>(null)
// 新增菜单
const addMenu = () => {
  menuDialogRef.value?.openDialog()
}
</script>

<style scoped lang="sass">
.el-menu
  @apply border-r-0
</style>