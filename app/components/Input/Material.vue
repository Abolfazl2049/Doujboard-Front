<script lang="ts">
export interface MaterialInputProps extends BaseInputProps {
  label?: string;
  icon?: Component;
  required?: boolean;
}
</script>
<script setup lang="ts">
import type { BaseInputEmits, BaseInputProps } from "./Base.vue";

let inputValue = defineModel<string>();
const { type: initType } = defineProps<MaterialInputProps>();
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
  <div
    :id="id"
    class="group relative flex w-full before:rounded-xl before:opacity-0 before:transition-all data-[is-focused=true]:before:opacity-100"
    :data-dir="dataDir"
    :data-type="initType"
    :data-has-action="initType === 'password'"
    :data-has-icon="Boolean(icon)"
    :data-has-regex="Boolean(regex)"
    :data-is-valid="isValid"
    :data-is-focused="isFocused"
    :class="$attrs.class">
    <component v-if="icon" :is="icon" class="a-center-y absolute left-3 z-10" />
    <InputBase
      class="relative z-10 h-13 w-full rounded-xl border-2 border-[#DCE4E8] px-3 transition-colors duration-300 group-data-[has-icon=true]:pl-12"
      v-bind="$props"
      v-model="inputValue"
      :type="type"
      @press-enter="emit('pressEnter')"
      v-model:is-focused="isFocused"
      @focusout="
        (e) => {
          emit('focusout', e);
          isValid = e.isValid;
        }
      "
      :ltr="dataDir === 'ltr'"
      @input-regex-fail="onInputRegexFail" />
    <InputPartsMaterialLabel
      :label="label"
      :should-float="isFocused || Boolean(inputValue)"
      :required="required"
      :has-icon="Boolean(icon)" />
    <InputPartsTogglePass v-if="initType === 'password' && inputValue?.trim()" v-model="type" />
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
