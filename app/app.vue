<script setup lang="ts">
const isAppMounted = ref(false);
const onBeforeEnter = async () => {
  let defaultLayout = document.getElementById("default-layout-con");
  if (defaultLayout) defaultLayout.scrollTop = 0;
};
onMounted(() => {
  isAppMounted.value = true;
});

provide("isAppMounted", isAppMounted);
</script>
<template>
  <Html lang="en-GB" dir="ltr">
    <Body :aria-locked="undefined">
      <NuxtLoadingIndicator :throttle="0" color="var(--color-primary)" />
      <NuxtLayout @before-enter="onBeforeEnter">
        <NuxtPage
          :transition="{
            onBeforeEnter,
          }" />
      </NuxtLayout>
    </Body>
  </Html>
</template>
