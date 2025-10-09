<script setup lang="ts">
import type { PropType } from "vue";

const { src, fallback, external, hasLoading } = defineProps({
  src: {
    type: String as PropType<string | undefined>,
    required: true,
  },
  fallback: {
    default: "/media/images/broken-image.png",
    type: String,
  },
  external: { type: Boolean, default: false },
  contain: Boolean,
  hasLoading: { type: Boolean, default: true },
});
let isLoaded = ref(false);
let imgSrc = ref();
const emits = defineEmits(["load", "error"]);
const onLoad = () => {
  isLoaded.value = true;
  emits("load");
};
const onError = () => {
  imgSrc.value = fallback;
  emits("error");
};
watch(
  () => src,
  () => {
    if (external) {
      if (src) imgSrc.value = src?.includes("http") ? src : `${BASE_API_URL}${src}`;
      else imgSrc.value = fallback;
    } else {
      imgSrc.value = src;
    }
  },
  { immediate: true },
);
</script>
<template>
  <div
    :data-is-loaded="hasLoading ? isLoaded : true"
    :data-fallback="imgSrc === fallback"
    :data-is-contain="contain"
    class="group relative overflow-hidden data-[fallback=true]:border data-[fallback=true]:border-black/10">
    <clientOnly>
      <img :src="imgSrc" @load="onLoad" class="size-full object-cover group-data-[is-contain=true]:object-contain" @error="onError" />
    </clientOnly>
    <div
      class="absolute inset-0 block size-full bg-slate-50 group-data-[is-loaded=true]:hidden before:absolute before:inset-0 before:animate-pulse before:bg-slate-300 dark:bg-slate-600 dark:before:bg-slate-700" />
  </div>
</template>
