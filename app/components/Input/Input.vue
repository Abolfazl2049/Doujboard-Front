<script setup lang="ts">
import type { BaseInputEmits } from "./Base.vue";

let inputValue = defineModel<string>();
const {
  type: initType,
  ltr,
  ltrOnFocus,
  ltrOnValue,
} = defineProps({
  title: String,
  share: {
    required: false,
    type: Boolean,
    default: false,
  },
  copy: {
    required: false,
    type: Boolean,
    default: false,
  },
  ltrOnFocus: {
    default: false,
    type: Boolean,
  },
  ltrOnValue: {
    default: false,
    type: Boolean,
  },
  ...BaseInputProps,
});
const emit = defineEmits<BaseInputEmits>();
const type = ref<typeof initType>(initType);
const isFocused = defineModel("isFocused", { default: false });
const { locale } = useI18n();
const copyToClipboard = () => {
  if (String(inputValue.value).trim()) {
    navigator.clipboard.writeText(String(inputValue.value));
    toast.success($t("text_copied_successfully"));
  }
};
const dataDir = computed(() => {
  return locale.value === "en-GB" || ltr || (ltrOnFocus && isFocused.value) || (ltrOnValue && inputValue.value) ? "ltr" : "rtl";
});
</script>
<template>
  <div
    :id="id"
    class="group data-[is-focused=true]:border-gradient-primary relative flex w-full before:rounded-xl"
    :data-dir="dataDir"
    :data-type="initType"
    :data-has-action="copy || share || initType === 'password'"
    :data-is-focused="isFocused">
    <InputBase
      class="relative z-10 h-13 w-full rounded-xl px-3 outline group-data-[dir='ltr']:group-data-[has-action=true]:pr-18 group-data-[dir='rtl']:group-data-[has-action=true]:pl-18 focus:outline-0 dark:outline-[#565656]"
      :id="id"
      v-model="inputValue"
      v-bind="$props"
      :type="type"
      @press-enter="emit('pressEnter')"
      v-model:is-focused="isFocused"
      @focusout="
        (e) => {
          emit('focusout', e);
        }
      "
      :ltr="dataDir === 'ltr'" />
    <InputPartsLabel :label="title" :should-float="isFocused || Boolean(inputValue)" />
    <InputPartsActionCon>
      <IconCopy v-if="copy" class="relative bottom-px size-4" @click="copyToClipboard" />
      <IconShareOutLine v-if="share" class="size-4" />
    </InputPartsActionCon>
    <InputPartsTogglePass v-if="initType === 'password' && inputValue?.trim()" v-model="type" />
  </div>
</template>
<style scoped>
@reference '~/assets/css/tailwind.css';
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  @apply border-none bg-white text-black shadow-[0_0_0_30px_white_inset] transition-[background-color] duration-[50000s] ease-in-out;
  -webkit-text-fill-color: black !important;
  background-image: none !important;
}

.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover,
.dark input:-webkit-autofill:focus,
.dark input:-webkit-autofill:active {
  @apply bg-[#2c2c2c] text-white shadow-[0_0_0_30px_#2c2c2c_inset];
  -webkit-text-fill-color: white !important;
  caret-color: white;
}
</style>
