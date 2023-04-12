<script setup lang="ts">
// import { icons } from '@element-plus/icons-vue/global'
import SubMenuList from './SubMenuList.vue'
defineProps<{
  menuList?: Array<Menu>
}>()
</script>

<template lang="pug">
template(v-for="menu in menuList")
  el-sub-menu(v-if="menu.children", :index="menu.path")
    template(#title)
      el-icon(v-if="menu.level === 1 && menu.icon")
        component(:is="menu.icon")
      span {{ menu.title }}
    SubMenuList(:menu-list="menu.children")
  el-menu-item(v-else, :index="menu.path") {{ menu.title }}
</template>