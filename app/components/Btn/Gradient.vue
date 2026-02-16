<script lang="ts">
interface GradientBtnProps extends BaseBtnProps {
  gradient?: "blue" | "bluePurple" | "brown" | "green" | "paleBlue";
}
</script>
<script setup lang="ts">
import type { BaseBtnEmits, BaseBtnProps } from "./Base.vue";

const { gradient = "blue" } = defineProps<GradientBtnProps>();
const emit = defineEmits<BaseBtnEmits>();
</script>
<template>
  <BtnBase
    v-bind="$props"
    :data-gradient="gradient"
    class="h-(--btn-h) bg-linear-to-r text-white"
    :class="{
      'from-[#155DFC] to-[#1447E6]': gradient === 'blue',
      'border border-[#BEDBFF] bg-linear-[135deg] from-[#EFF6FF] to-[#DBEAFE] text-blue-600!': gradient === 'paleBlue',
      'from-green-haze bg-linear-to-r to-[#008236] [box-shadow:0_4px_6px_0_#00c9506d]': gradient === 'green',
      'from-[#F54900] to-[#CA3500]': gradient === 'brown',
      'from-[#2B7FFF] to-[#9810FA]': gradient === 'bluePurple',
    }"
    @click="(e) => emit('click', e)"
    @disabledClick="emit('disabledClick')">
    <slot />
  </BtnBase>
</template>
