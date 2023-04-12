<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = reactive(zhCn)
const nuxtApp = useNuxtApp()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  nuxtApp.vueApp.component(key, component)
}

const {data: dictionary} = await useFetch('/api/dictionary/getDictionary')
provide('dictionary', dictionary)
</script>
<template lang="pug">
el-config-provider(:locale="locale")
  NuxtPage
</template>