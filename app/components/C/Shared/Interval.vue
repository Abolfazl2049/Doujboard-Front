<script setup lang="ts">
let interval: null | number = null;
const count = ref(0);
onMounted(() => {
  interval = setInterval(() => {
    count.value++;
  }, 1000);
});
onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
<template>
  <div :key="`${genUUID()}(${count})`">
    <slot :count="count" />
  </div>
</template>
