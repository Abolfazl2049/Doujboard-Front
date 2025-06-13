<script setup lang="ts">
let {douj} = defineProps({
  douj: {
    required: true,
    type: Object
  }
});
</script>
<template>
  <NuxtLink :to="douj.link" target="_blank" external class="rounded-xl overflow-hidden border border-gray-300 shadow-lg">
    <TheImg :src="douj.img" class="h-[180px]" />
    <div class="h-[150px] p-2.5">
      <p class="text-xl">
        {{ douj.title }}
      </p>
      <p class="line-clamp-4">
        {{ douj.description }}
      </p>
    </div>
  </NuxtLink>
</template>
