<script setup lang="ts">
const show = defineModel();
</script>
<template>
  <div v-if="show" @click.self="show = false" class="flex-center fixed inset-0 z-[100] w-full bg-black/70">
    <slot />
  </div>
</template>
