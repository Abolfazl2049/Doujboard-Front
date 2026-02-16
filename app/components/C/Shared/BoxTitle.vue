<script setup lang="ts">
const { colorBoxType } = defineProps({
  colorBoxType: {
    type: String as PropType<"none" | "green" | "primary" | "gradient">,
    default: "primary",
  },
  icon: Object as PropType<Component>,
});
</script>
<template>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center gap-3 max-lg:gap-2">
      <component :is="icon" v-if="icon" />
      <div v-else-if="colorBoxType !== 'none'">
        <div
          class="h-9 w-1 rounded-full bg-linear-to-b from-[#00BC7D] to-[#009966] max-lg:h-6"
          v-if="colorBoxType === 'green'" />
        <div class="bg-primary h-9 w-1 rounded-full max-lg:h-6" v-else-if="colorBoxType === 'primary'" />
        <div
          class="h-9 w-1 rounded-full bg-linear-to-b from-[#FF6900] to-[#FE9A00] max-lg:h-6"
          v-else-if="colorBoxType === 'gradient'" />
      </div>
      <p class="text-[22px] font-light !text-black max-lg:text-base">
        <slot />
      </p>
    </div>
    <slot name="btn" />
  </div>
</template>
