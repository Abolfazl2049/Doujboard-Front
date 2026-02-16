<script setup lang="ts">
import type { BaseBtnEmits, BaseBtnProps } from "./Base.vue";

const {} = defineProps<BaseBtnProps>();
const emit = defineEmits<BaseBtnEmits>();
</script>
<template>
  <BtnBase
    v-bind="$props"
    class="bg-gradient-primary h-(--btn-h) text-white"
    @click="(e) => emit('click', e)"
    @disabledClick="emit('disabledClick')">
    <slot />
  </BtnBase>
</template>
