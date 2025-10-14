<script setup lang="ts">
import { BaseBtnProps, type BaseBtnEmits } from "./Base.vue";

const { disabled } = defineProps({
  ...BaseBtnProps,
});
const emit = defineEmits<BaseBtnEmits>();
</script>
<template>
  <BtnBase v-bind="$props" class="bg-btn h-12 rounded-[10px] bg-[#9C8D91] font-light text-white not-disabled:font-medium" @click="(e) => emit('click', e)">
    <slot />
  </BtnBase>
</template>
<style scoped>
.bg-btn:not([disabled]) {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
}
</style>
