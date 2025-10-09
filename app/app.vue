<script setup lang="ts">
// import { RouteChannel } from "./core/pub-subs/index";
const isAppMounted = ref(false);
const { finalizePendingLocaleChange, t } = useI18n();
const pwa = usePWA();
const onBeforeEnter = async () => {
  let defaultLayout = document.getElementById("default-layout-con");
  if (defaultLayout) defaultLayout.scrollTop = 0;
  await finalizePendingLocaleChange();
};
const { locale } = useI18n();
const head = useLocaleHead({ dir: true });

// Reactive title management
useHead({
  title: computed(() => t("app_title")),
});

onMounted(() => {
  if (!pwa?.isPWAInstalled && pwa?.cancelInstall()) pwa.install();
  isAppMounted.value = true;
});
const route = useRoute();
// watch(
//   () => route.fullPath,
//   () => {
//     RouteChannel.publish(route);
//   },
// );
provide("isAppMounted", isAppMounted);
</script>
<template>
  <VitePwaManifest />
  <Html :lang="locale" :dir="head.htmlAttrs?.dir">
    <NuxtLoadingIndicator :throttle="0" color="var(--color-primary)" />
    <NuxtLayout @before-enter="onBeforeEnter">
      <NuxtPage
        :transition="{
          onBeforeEnter,
        }" />
    </NuxtLayout>
    <NodePublicDevPanel />
  </Html>
</template>
