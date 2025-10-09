<script setup lang="ts">
import type { BaseInputEmits } from "../Input/Base.vue";

let inputValue = defineModel<string>();
const {} = defineProps({
  title: String,
  minH: {
    type: String,
    default: "100px",
  },
  id: String,
  maxLength: Number,
});
const emit = defineEmits<BaseInputEmits>();
const inputCon = ref<HTMLDivElement>();
const isFocused = ref(false);

const onInput = (ev: Event) => {
  if (inputCon.value) {
    let t = ev.target as HTMLInputElement;
    let sh = t.scrollHeight;
    if (sh < 44) sh = 44;
    inputCon.value.style.height = t.value ? sh + "px" : "44px";
  }
};
</script>
<template>
  <div
    class="group textarea-con data-[is-focused=true]:border-gradient-primary relative w-full before:rounded-xl"
    :data-is-focused="isFocused"
    :data-has-value="Boolean(inputValue)"
    :id="id">
    <textarea
      ref="inputCon"
      v-model.trim="inputValue as string"
      :id="id as string"
      @focus="isFocused = true"
      @focusout="
        (e) => {
          isFocused = false;
          emit('focusout', e as any);
        }
      "
      @input="onInput"
      @keypress.enter.exact.prevent="emit('pressEnter')"
      class="relative z-10 h-full max-h-[400px] min-h-14 w-full resize-none overflow-y-scroll rounded-xl px-3 py-3 outline group-data-[type=password]:group-data-[is-ltr=true]:pr-12 focus:outline-2 focus:outline-none dark:outline-[#565656]"
      :style="{
        minHeight: minH,
      }"
      :maxlength="maxLength"
      :data-is-valid="Boolean(inputValue?.trim()?.length)" />
    <InputPartsLabel position-less :label="title" class="top-2 data-[should-float=true]:!-top-1" :should-float="isFocused || Boolean(inputValue)" />
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
