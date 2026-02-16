<script setup lang="ts">
const spanRef = useTemplateRef("span");
function detectDir(): "rtl" | "ltr" {
  const text = spanRef.value?.textContent;
  if (text?.match(FaCharRegex)) return "rtl";
  else return "ltr";
}
</script>
<template>
  <span ref="span" :dir="detectDir()">
    <slot />
  </span>
</template>
