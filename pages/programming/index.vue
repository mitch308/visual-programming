<script setup lang="ts">
import Header from './Header.vue';
import LeftAside from './LeftAside.vue';
import Main from './Main.vue'
import RightAside from './RightAside.vue'

</script>

<template lang="pug">
.flex.flex-row.h-full
  Header
  .flex.flex-auto
    LeftAside
    Main
    RightAside
</template>