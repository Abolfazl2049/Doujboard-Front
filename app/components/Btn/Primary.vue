<script setup lang="ts">
import { BaseBtnProps, type BaseBtnEmits } from "./Base.vue";

const { disabled } = defineProps({
  ...BaseBtnProps,
});
const emit = defineEmits<BaseBtnEmits>();
</script>
<template>
  <BtnBase
    v-bind="$props"
    class="w-full rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    @click="(e) => emit('click', e)">
    <slot />
  </BtnBase>
</template>
