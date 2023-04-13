<script setup lang="ts">
// import { icons } from '@element-plus/icons-vue/global'
import SubMenuList from './SubMenuList.vue'
import { useMenuStore } from '../../store/menuStore';
defineProps<{
  menuList?: Array<Menu>
}>()

const menuStore = useMenuStore()
const handleSelectMenu = (menu: Menu) => {
  menuStore.currentMenu = menu
}
</script>

<template lang="pug">
template(v-for="menu in menuList")
  el-sub-menu(v-if="menu.children", :index="menu.path")
    template(#title)
      el-icon(v-if="menu.level === 1 && menu.icon")
        component(:is="menu.icon")
      span {{ menu.title }}
    SubMenuList(:menu-list="menu.children")
  el-menu-item(v-else, :index="menu.path", @click="handleSelectMenu(menu)") {{ menu.title }}
</template>