<script setup lang="ts">
import type { BaseInputEmits } from "../Input/Base.vue";

const inputValue = defineModel<string | null>();
import type { Component } from "vue";

const {
  regex,
  minH = "75px",
  rtl = false,
  size = "md",
} = defineProps<{
  label?: string;
  minH?: string;
  id?: string;
  maxLength?: number;
  icon?: Component;
  regex?: RegExp;
  required?: boolean;
  placeholder?: string;
  rtl?: boolean;
  disabled?: boolean;
  optionalBadge?: boolean;
  size?: "sm" | "md";
}>();
const emit = defineEmits<BaseInputEmits>();
const inputCon = ref<HTMLDivElement>();
const isFocused = ref(false);

const onInput = (ev: Event) => {
  if (inputCon.value) {
    const t = ev.target as HTMLInputElement;
    let sh = t.scrollHeight;
    if (sh < 44) sh = 44;
    inputCon.value.style.height = t.value ? sh + "px" : minH;
  }
};

const isValid = computed(() => {
  if (regex) return regex.test(inputValue.value as string);
  else return Boolean(inputValue.value?.trim()?.length);
});
</script>
<template>
  <div :id="id" :data-size="size" class="group/con">
    <div
      class="input-label text-cod-gray-200 group-data- mb-0.5 flex items-center gap-1 text-nowrap group-data-[size=sm]/con:text-sm!"
      v-if="label">
      <slot name="header"></slot>
      <p>{{ label }}</p>
      <p class="text-red" v-if="required">*</p>
      <div
        v-if="optionalBadge"
        class="badge-base text-river-bed border-none! bg-[#F3F4F6] font-semibold! before:hidden!">
        Optional
      </div>
    </div>
    <div
      class="group relative"
      :data-is-focused="isFocused"
      :data-has-icon="Boolean(icon)"
      :data-has-value="Boolean(inputValue)"
      :id="id">
      <component v-if="icon" :is="icon" class="absolute top-4 left-3 z-40 min-h-5 min-w-5" />
      <textarea
        :disabled="disabled"
        ref="inputCon"
        v-model.trim="inputValue"
        :placeholder="placeholder"
        :id="id as string"
        @focus="
          () => {
            emit('focus');
            isFocused = true;
          }
        "
        @focusout="
          (e) => {
            isFocused = false;
            emit('focusout', e as any);
          }
        "
        @input="onInput"
        @keypress.enter.exact.prevent="emit('pressEnter')"
        class="bg-athens-gray-200 placeholder:text-storm-gray group-data/con:text-sm! relative z-10 h-full max-h-[400px] min-h-14 w-full resize-none overflow-y-scroll rounded-lg px-3 py-3 text-[15px] outline-none group-data-[has-icon=true]:pl-12 group-data-[type=password]:group-data-[is-ltr=true]:pr-12"
        :style="{
          minHeight: minH,
        }"
        :maxlength="maxLength"
        :data-is-valid="isValid"
        :dir="rtl && inputValue ? 'rtl' : 'ltr'" />
    </div>
  </div>
</template>
<style scoped>
@reference '~/assets/css/tailwind.css';
/* Enhanced autofill styles for better Safari compatibility */
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active {
  /* Use specific color values instead of CSS variables for Safari */
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: black !important;
  border: none !important;
  background-color: transparent !important;
  background-image: none !important;
  /* Delay background color change to effectively disable it */
  transition: background-color 50000s ease-in-out 0s;
}

/* Dark mode with explicit color values */
.dark textarea:-webkit-autofill,
.dark textarea:-webkit-autofill:hover,
.dark textarea:-webkit-autofill:focus,
.dark textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #2c2c2c inset !important;
  box-shadow: 0 0 0 30px #2c2c2c inset !important;
  -webkit-text-fill-color: white !important;
  caret-color: white;
}
</style>
