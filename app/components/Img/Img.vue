<script setup lang="ts">
const {
  src,
  fallback = "/media/images/app-logo.png",
  external,
  hasLoading,
} = defineProps<{
  src?: string;
  fallback?: string;
  external?: boolean;
  hasLoading?: boolean;
  contain?: boolean;
}>();
const didLoad = ref(false);
const didFail = ref(false);
const emits = defineEmits<{
  load: [];
  error: [];
}>();
const onLoad = () => {
  didLoad.value = true;
  emits("load");
};
const onError = () => {
  didFail.value = true;
  emits("error");
};

const computedSrc = computed(() => {
  if (didFail.value) return fallback;
  if (external) {
    if (src) return src?.includes("http") ? src : `${BASE_API_URL}${src}`;
    else return fallback;
  } else return src;
});
</script>
<template>
  <div
    :data-is-loaded="hasLoading ? didLoad : true"
    :data-fallback="computedSrc === fallback"
    :data-is-contain="contain"
    class="group relative overflow-hidden">
    <img
      :src="computedSrc"
      class="size-full object-cover group-data-[is-contain=true]:object-contain"
      @load="onLoad"
      @error="onError" />
    <div
      class="absolute inset-0 block size-full bg-slate-50 group-data-[is-loaded=true]:hidden before:absolute before:inset-0 before:animate-pulse before:bg-slate-300 dark:bg-slate-600 dark:before:bg-slate-700" />
  </div>
</template>
