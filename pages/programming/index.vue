<script setup lang="ts">
import Header from '../../components/programming/Header.vue';
import LeftAside from '../../components/programming/LeftAside.vue';
import Main from '../../components/programming/Main.vue'
import RightAside from '../../components/programming/RightAside.vue'
import { useMenuStore } from '../../store/menuStore';

const menuStore = useMenuStore()
menuStore.refreshMenu()
</script>

<template lang="pug">
.flex.flex-col.h-full
  Header
  .flex.flex-auto
    LeftAside
    Main
    RightAside
</template>