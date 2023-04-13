<script setup lang="ts">
import { useMenuStore } from '../../store/menuStore';

const menuStore = useMenuStore()
menuStore.refreshMenu()
</script>

<template lang="pug">
ClientOnly
  .flex.flex-col.h-full
    ProgrammingHeader
    .flex.flex-auto
      ProgrammingLeftAside
      ProgrammingMain
      ProgrammingRightAside
</template>