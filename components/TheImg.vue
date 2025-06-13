<script setup lang="ts">
const { src, fallback, local } = defineProps({
  src: {
    type: String,
    required: true,
  },
  fallback: {
    default: "/imgs/broken_img.png",
    type: String,
  },
  local: Boolean,
  id: String,
});
let isLoaded = ref(false);
let imgSrc = ref();
const emits = defineEmits(["dragstart", "dragend"]);
watch(
  () => src,
  () => {
    if (local) {
      imgSrc.value = src;
      isLoaded.value = true;
    } else imgSrc.value = src?.includes("http") ? src : `${assetsURL}${src}`;
  },
  { immediate: true },
);
</script>
<template>
  <div class="overflow-hidden">
    <div class="relative size-full">
      <img @dragstart="emits('dragstart')" @dragend="emits('dragend')" :src="imgSrc" @load="isLoaded = true" class="size-full object-cover" @error="imgSrc = fallback" :id="id" />
      <div v-if="!isLoaded" class="absolute inset-0 size-full bg-slate-50 before:absolute before:inset-0 before:animate-pulse before:bg-slate-300 dark:bg-slate-600 dark:before:bg-slate-700" />
    </div>
  </div>
</template>
