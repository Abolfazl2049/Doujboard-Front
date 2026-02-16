<script lang="ts">
export interface DefaultInputProps extends BaseInputProps {
  label?: string;
  icon?: Component;
  required?: boolean;
  size?: "sm" | "md";
}
</script>
<script setup lang="ts">
import type { BaseInputEmits, BaseInputProps } from "./Base.vue";

const inputValue = defineModel<string | undefined | null>();
const { type: initType, size = "md" } = defineProps<DefaultInputProps>();
const emit = defineEmits<BaseInputEmits>();
const type = ref<typeof initType>(initType);
const isFocused = defineModel("isFocused", { default: false });
const dataDir = computed(() => {
  return isFocused.value || inputValue.value ? "ltr" : "rtl";
});

const isValid = ref<boolean>();

const onInputRegexFail = () => {
  isValid.value = true;
  setTimeout(() => {
    isValid.value = false;
  }, 3000);
};
</script>
<template>
  <div :data-size="size" class="group">
    <div v-if="label" class="input-label mb-1 flex items-center gap-1 text-nowrap group-data-[size=sm]:text-sm!">
      <slot name="header"> </slot>
      <p>{{ label }}</p>
      <p class="text-red" v-if="required">*</p>
    </div>
    <div
      :id="id"
      class="group relative flex w-full"
      :data-dir="dataDir"
      :data-type="initType"
      :data-has-action="initType === 'password'"
      :data-has-icon="Boolean(icon)"
      :data-has-regex="Boolean(regex)"
      :data-is-valid="isValid"
      :data-is-focused="isFocused"
      :class="$attrs.class">
      <component v-if="icon" :is="icon" class="a-center-y absolute left-3 z-40 min-h-5 min-w-5" />
      <InputBase
        class="bg-athens-gray-200 relative z-10 h-(--input-h) w-full rounded-(--input-radius) px-3 transition-colors duration-300 group-data-[has-icon=true]:pl-12 group-data-[size=sm]:h-(--input-h-sm) placeholder:text-sm group-data-[size=sm]:placeholder:text-xs"
        v-bind="$props"
        v-model="inputValue"
        :type="type"
        @press-enter="emit('pressEnter')"
        v-model:is-focused="isFocused"
        @focusout="
          (e: any) => {
            emit('focusout', e);
            isValid = e.isValid;
          }
        "
        :ltr="dataDir === 'ltr'"
        @input-regex-fail="onInputRegexFail"
        :size="undefined" />
      <!-- setting size to prevent size dom attr error -->
      <InputPartsTogglePass v-if="initType === 'password' && inputValue?.trim()" v-model="type" />
    </div>
  </div>
</template>
<style scoped>
@reference '~/assets/css/tailwind.css';
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  @apply !border-2 !border-[#DCE4E8] !bg-transparent text-black !shadow-[0_0_0_30px_transparent_inset] transition-[background-color] duration-[50000s] ease-in-out;
  -webkit-text-fill-color: black !important;
}
</style>
