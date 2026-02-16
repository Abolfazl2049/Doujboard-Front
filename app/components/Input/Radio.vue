<script setup lang="ts">
import type { PropType } from "vue";

const selected = defineModel<VariantInit>();
defineProps({
  options: { type: Array as PropType<VariantInit<string, string>[]>, required: true },
  name: {
    type: String,
    default: "group",
  },
});
</script>
<template>
  <div class="flex-col gap-2 duration-300 **:transition-all">
    <div
      v-for="(i, index) in options"
      :key="index"
      class="flex cursor-pointer items-center gap-3"
      @click="selected = i">
      <input
        :id="'input-' + i.key"
        type="radio"
        :value="i"
        :name="name"
        :checked="selected?.name == i.name"
        @input="($event.target as any).value ? (selected = i) : undefined"
        class="outline-primary checked:bg-gradient-primary size-[7px] appearance-none rounded-full outline outline-offset-3"
        readonly />
      <label :for="'input-' + i.key" class="text-xs">{{ i.displayName }}</label>
    </div>
  </div>
</template>
