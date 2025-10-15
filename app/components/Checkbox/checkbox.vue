<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

const props = defineProps({
  disabled: { type: Boolean, default: false },
  size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
});

const value = defineModel({ default: false });
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};
</script>
<template>
  <CheckboxRoot v-model="value" :checked="value" :disabled="disabled" class="checkbox-root" :class="[sizeClasses[size], disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer']">
    <CheckboxIndicator class="checkbox-indicator">
      <Icon icon="heroicons:check" :class="iconSizes[size]" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style scoped>
@reference '~/assets/css/tailwind.css';

.checkbox-root {
  @apply relative inline-flex items-center justify-center rounded border-2 border-gray-300 bg-white transition-all duration-200;
  @apply hover:border-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none;
}

.checkbox-root[data-state="checked"] {
  @apply border-black bg-black;
}

.checkbox-root[data-state="checked"]:hover {
  @apply border-gray-800 bg-gray-800;
}

.checkbox-indicator {
  @apply flex items-center justify-center text-white;
}

.checkbox-root[data-disabled] {
  @apply cursor-not-allowed opacity-50;
}

.checkbox-root[data-disabled]:hover {
  @apply border-gray-300 bg-white;
}
</style>
