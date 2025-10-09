<script setup lang="ts">
import type { PropType } from "vue";
import { Vue3Lottie, type LottieProps } from "vue3-lottie";
const isLoaded = ref(false);
const emits = defineEmits<{
  complete: [];
}>();
defineProps({
  props: {
    type: Object as PropType<Partial<LottieProps>>,
    default: {},
  },
});
</script>
<template>
  <div class="relative size-fit">
    <ClientOnly>
      <Vue3Lottie v-bind="props" :animation-data="props.animationData" @on-animation-loaded="isLoaded = true" @on-complete="emits('complete')" />
      <SkeletonLottie v-if="!isLoaded" :style="{ width: props.width, height: props.height }" />
      <template #fallback>
        <SkeletonLottie :style="{ width: props.width, height: props.height }" />
      </template>
    </ClientOnly>
  </div>
</template>
