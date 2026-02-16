<script setup lang="ts">
defineProps({
  label: { type: String },
  shouldFloat: {
    type: Boolean,
    default: false,
  },
  positionLess: Boolean,
  coinAmount: Number,
  required: Boolean,
  hasIcon: Boolean,
});
</script>
<template>
  <label
    :data-should-float="shouldFloat"
    class="dark:bg-mine-shaft absolute left-5 z-0 w-fit origin-[0] bg-white text-sm text-nowrap transition-all duration-300 select-none"
    :class="{ 'a-center-y': !positionLess, 'left-12': hasIcon }">
    {{ label }}
    <span v-if="required" class="!inline text-[#C30000]">*</span>
    <CSharedCoinAmount v-if="coinAmount" :amount="coinAmount" />
  </label>
</template>
<style scoped>
@reference '~/assets/css/tailwind.css';
label[data-should-float="true"] {
  @apply -top-0 !z-20 -mx-1.5 px-2 text-xs ltr:left-3 rtl:right-3;
}
</style>
