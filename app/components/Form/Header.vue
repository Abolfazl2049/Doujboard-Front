<script setup lang="ts">
defineProps<{
  title: string;
  color?: string;
  noIcon?: boolean;
}>();
</script>
<template>
  <div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-1">
      <div
        v-if="!noIcon"
        class="bg-primary/10 flex-center size-8 rounded-xl"
        :style="{ backgroundColor: `${color} !important` }">
        <slot name="icon"></slot>
      </div>
      <span class="title text-lg font-medium">
        {{ title }}
      </span>
    </div>
    <slot />
  </div>
</template>
