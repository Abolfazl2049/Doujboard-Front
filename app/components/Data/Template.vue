<script setup lang="ts">
import type { PropType } from "vue";

const {} = defineProps({
  isComplete: { type: Boolean, required: true },
  data: { type: Object as any, required: true },
  emptyConAttrs: Object,
  options: {
    type: Object as PropType<{ showDataAnyway: boolean }>,
  },
});
</script>
<template>
  <slot v-if="(Array.isArray(data) ? data?.length : data) || (options?.showDataAnyway && isComplete)"></slot>
  <slot v-else-if="isComplete" name="empty">
    <DataEmpty v-bind="emptyConAttrs" />
  </slot>
  <slot v-else name="loading"> </slot>
</template>
