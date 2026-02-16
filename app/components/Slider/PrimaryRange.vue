<script lang="ts">
class RangeNumberValue {
  min: number = 0;
  max: number = 100;
  value: [number, number];
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.value = [min, max];
  }
  isDefault() {
    return this.value[0] === this.min && this.value[1] === this.max;
  }
}
export { RangeNumberValue };
</script>
<script setup lang="ts">
import { FormHeader } from "#components";
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";
const { min, max } = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: {
    type: String,
    default: "",
  },
  nearAccept: { type: Number, default: 5 },
  color: String,
});
const value = defineModel<[number, number]>({ default: [0, 0] });

const onUpdateValue = () => {
  vibrate(100);
};
</script>
<template>
  <div class="relative w-full overflow-visible">
    <FormHeader :title="label" :color="color">
      <template #icon>
        <slot name="icon" />
      </template>
      <div class="text-primary rounded-xl border border-[#F8520633] bg-[#F852061A] px-2 py-1 text-xs font-medium">
        {{ value[0] }} - {{ value[1] }}
      </div>
    </FormHeader>
    <SliderRoot
      v-model="value"
      class="relative flex w-full touch-none items-center overflow-visible pt-4 select-none"
      :min="min"
      :max="max"
      :min-steps-between-thumbs="2"
      @update:model-value="onUpdateValue">
      <SliderTrack class="relative h-4 grow rounded-full bg-[#9893941A]">
        <SliderRange class="bg-gradient-primary absolute h-full rounded-full" />
      </SliderTrack>
      <SliderThumb
        class="border-gradient-primary relative block size-4 overflow-visible rounded-full bg-white before:rounded-full focus:outline-none">
      </SliderThumb>
      <SliderThumb
        class="border-gradient-primary relative block size-4 overflow-visible rounded-full bg-white before:rounded-full focus:outline-none">
      </SliderThumb>
    </SliderRoot>
    <div class="text-pale-sky flex justify-between pt-1 text-sm">
      <span> {{ min }} </span>
      <span>
        {{ max }}
      </span>
    </div>
  </div>
</template>
