<script setup lang="ts">
import PageInfo from './PageInfo.vue';
import AttributeInfo from './AttributeInfo.vue';
import ComponentsInfo from './ComponentsInfo.vue';
import { useMenuStore } from '../../store/menuStore';

const menuStore = useMenuStore()
// 激活的tab
const activeTab = ref('componentsInfo')
</script>

<template lang="pug">
.right-aside.border-l.w-60
  el-tabs(type="card", stretch, v-model="activeTab")
    el-tab-pane(label="页面", name="pageInfo", v-if="menuStore.currentMenu")
      PageInfo
    el-tab-pane(label="属性", name="attributeInfo")
      AttributeInfo
    el-tab-pane(label="组件", name="componentsInfo")
      ComponentsInfo
</template>