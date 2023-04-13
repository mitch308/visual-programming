<script setup lang="ts">
import { useMenuStore } from '../../store/menuStore';
const menuStore = useMenuStore()

</script>
<template lang="pug">
.main.flex-auto {{ menuStore.currentMenu?.title }}
</template>

<style scoped lang="sass"></style>