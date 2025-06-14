<script setup lang="ts">
let {douj} = defineProps({
  douj: {
    required: true,
    type: Object
  }
});
</script>
<template>
  <NuxtLink :to="douj.link" target="_blank" external class="rounded-xl overflow-hidden border border-gray-300 shadow-lg relative pt-[180px]">
    <TheImg :src="douj.img" class=" absolute inset-0" />
    <div class="h-[150px] p-2.5 relative z-10 backdrop-blur-xl text-white">
      <p class="text-xl">
        {{ douj.title }}
      </p>
      <p class="line-clamp-4">
        {{ douj.description }}
      </p>
    </div>
  </NuxtLink>
</template>
