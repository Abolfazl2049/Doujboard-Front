<script setup lang="ts">
defineProps({
  amount: Number,
  size: {
    type: String,
    default: "sm",
  },
});
</script>
<template>
  <div :data-size="size" class="group inline-flex items-center gap-1">
    <span class="text-[11px] group-data-[size=lg]:text-[16px] group-data-[size=md]:text-[14px]">
      {{ formatPrice(amount || 0) }}
    </span>
    <!-- <IconSingleCoin class="relative bottom-0.5 size-2.5 group-data-[size=lg]:size-3 group-data-[size=md]:size-2.5" /> -->
  </div>
</template>
