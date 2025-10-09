<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";
const { min, max } = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: String,
});
const value = defineModel({ default: [0, 0] });
</script>
<template>
  <div class="w-full">
    <span>
      {{ label }}
    </span>
    <SliderRoot v-model="value" class="relative flex w-full touch-none items-center pt-4 pb-8 select-none" :min="min" :max="max" :min-steps-between-thumbs="2">
      <SliderTrack class="relative h-1 grow rounded-full bg-[#9893941A]">
        <SliderRange class="bg-gradient-primary absolute h-full rounded-full" />
      </SliderTrack>
      <SliderThumb class="border-gradient-primary relative block size-6 overflow-visible rounded-full bg-white before:rounded-full focus:outline-none">
        <span class="a-center-x absolute -bottom-6 text-sm font-bold">
          {{ value[0] }}
        </span>
      </SliderThumb>
      <SliderThumb class="border-gradient-primary relative block size-6 overflow-visible rounded-full bg-white before:rounded-full focus:outline-none">
        <span class="a-center-x absolute -bottom-6 text-sm font-bold">
          {{ value[1] }}
        </span>
      </SliderThumb>
    </SliderRoot>
  </div>
</template>
