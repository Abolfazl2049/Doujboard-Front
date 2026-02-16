<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from "reka-ui";

const { header = true } = defineProps<{
  options: { icon?: Component; label?: string; value?: string | number }[];
  header?: boolean;
  label: string;
  radio?: boolean;
  noIcon?: boolean;
}>();

const selected = defineModel<string | number>();
</script>
<template>
  <div :data-has-radio="radio ? true : undefined" class="group">
    <FormHeader v-if="header" :title="label" :no-icon="noIcon">
      <template #icon>
        <slot name="icon" />
      </template>
    </FormHeader>
    <RadioGroupRoot v-model="selected" class="grid-con mt-4 grid grid-cols-2 gap-3 max-lg:grid-cols-1">
      <RadioGroupItem
        v-for="(option, index) in options"
        class="data-active:border-gradient-primary radio-group-item flex-center border-athens-gray flex h-14 items-center rounded-xl border px-3 group-data-has-radio:justify-start before:rounded-xl"
        :value="option.value"
        :key="index">
        <div class="flex w-fit items-center gap-1">
          <component :is="option.icon" class="mr-2" />
          <span>{{ option.label }}</span>
        </div>
        <input v-if="radio" :checked="selected === option.value" type="radio" class="!accent-primary ml-auto size-5" />
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>
