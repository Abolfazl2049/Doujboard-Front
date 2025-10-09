<script setup lang="ts">
import { AuthenticationStep } from "~/core/@services/auth/class";

const step = ref<AuthenticationStep | null>(null);
const route = useRoute();
const colorMode = useColorMode();
const patternImageUpdateCount = ref(0);
const patternImageSrc = ref({
  previous: "",
  current: "",
});
onMounted(() => {
  step.value = new AuthenticationStep(route.path);
  patternImageSrc.value.current = step.value.patternImageSrc as string;
});
// RouteChannel.subscribe((r) => {
//   patternImageSrc.value.previous = step.value?.patternImageSrc as string;
//   step.value = new AuthenticationStep(route.path);
//   patternImageSrc.value.current = step.value.patternImageSrc as string;
//   patternImageUpdateCount.value++;
// });
</script>
<template>
  <div class="auth-layout-container relative h-[100dvh] flex-col justify-between overflow-auto px-5">
    <div class="relative z-10 flex-1">
      <NodeAuthProgressBar :step="step" />
      <Img v-if="step?.showLogo" src="/media/images/app-logo.png" class="mx-auto mt-16 size-[115px]" />
      <slot />
    </div>
    <NodeAuthMadeWithLove v-if="step?.showMadeWithLoveBox" />
    <div :data-has-previous="Boolean(patternImageSrc.previous)" class="a-center-x group image-pattern-size fixed bottom-0 z-0 overflow-hidden" dir="rtl">
      <div class="flex w-[2000vw] max-w-[1080px] whitespace-nowrap" :key="`pattern-image-${patternImageUpdateCount}`" :class="{ 'slide-animation': patternImageSrc.previous }">
        <Img
          v-if="patternImageSrc.current"
          :src="colorMode.value === 'dark' ? patternImageSrc.current : patternImageSrc.current?.replace('.png', '-light.png')"
          class="image-pattern-size dark:opacity-50" />
        <Img
          v-if="patternImageSrc.previous && patternImageSrc.current"
          :src="colorMode.value === 'dark' ? patternImageSrc.previous : patternImageSrc.previous?.replace('.png', '-light.png')"
          class="image-pattern-size dark:opacity-50" />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* auth content container  */
@reference '~/assets/css/tailwind.css';
.auth-layout-container > div:nth-child(2) {
}
.image-pattern-size {
  @apply h-[360px] w-screen max-w-[540px];
}
.slide-animation {
  animation: slide-next 0.7s ease-in-out forwards;
}
@keyframes slide-next {
  0% {
    opacity: 0.5;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
