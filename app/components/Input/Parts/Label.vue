<script setup lang="ts">
defineProps({
  label: { type: String },
  shouldFloat: {
    type: Boolean,
    default: false,
  },
  positionLess: Boolean,
  coinAmount: Number,
});
</script>
<template>
  <label
    :data-should-float="shouldFloat"
    class="dark:bg-mine-shaft absolute w-fit origin-[0] bg-white text-sm text-nowrap transition-all duration-300 ltr:left-5 rtl:right-5"
    :class="{ 'a-center-y': !positionLess }">
    {{ label }}
    <NodePublicCoinAmount v-if="coinAmount" :amount="coinAmount" />
  </label>
</template>
<style scoped>
@reference '~/assets/css/tailwind.css';
label[data-should-float="true"] {
  @apply text-2xs -top-0 !z-20 -mx-1.5 px-2 font-medium ltr:left-3 rtl:right-3;
}
</style>
