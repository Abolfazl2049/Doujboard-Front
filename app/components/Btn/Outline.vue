<script setup lang="ts">
import type { BaseBtnEmits, BaseBtnProps } from "./Base.vue";

const {} = defineProps<BaseBtnProps>();
const emit = defineEmits<BaseBtnEmits>();
</script>
<template>
  <BtnBase
    v-bind="$props"
    class="h-(--btn-h) bg-white outline outline-[#0000001A] focus:outline!"
    @click="(e) => emit('click', e)">
    <slot />
  </BtnBase>
</template>
