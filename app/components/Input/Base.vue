<script lang="ts">
interface BaseInputEmits {
  change: [value: string];
  focusout: [
    data: {
      isValid: boolean;
      value: string;
    },
  ];
  pressEnter: [];
  focus: [];
}
export type { BaseInputEmits };
const BaseInputProps = {
  placeholder: String,
  type: {
    default: "text",
    type: String as PropType<InputHTMLAttributes["type"]>,
  },
  id: String,
  disabled: Boolean,
  readonly: Boolean,
  ltr: Boolean,
  autofocus: Boolean,
  maxLength: Number,
  inputMode: {
    default: "text",
    type: String as PropType<InputHTMLAttributes["inputmode"]>,
  },
  options: {
    type: Object as PropType<
      Partial<{
        regex: Partial<{
          input: RegExp;
          focusout: RegExp;
        }>;
        hooks: Partial<{
          beforeInputRegexTest: (resultValue: string, valueToTest: string) => { resultValue: string; valueToTest: string };
          afterInputRegexTest: (resultValue: string) => { resultValue: string };
        }>;
      }>
    >,
    default: {},
  },
};
export { BaseInputProps };
</script>
<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

const { placeholder, type, id, options, autofocus, readonly } = defineProps(BaseInputProps);
const value = defineModel({ type: String, default: "" });
const emits = defineEmits<BaseInputEmits>();
const oldValue = ref<string>("");
const inputRef = useTemplateRef("inputTemplate");
const isValid = ref(false);
const isFocused = defineModel("isFocused", { default: false });

const onBeforeInput = () => {
  oldValue.value = value.value;
};
const onInput = (ev: Event) => {
  const inputValue = (ev.target as HTMLInputElement)?.value;

  if (inputValue) {
    let valueToTest = inputValue;
    let resultValue = inputValue;

    if (options?.hooks?.beforeInputRegexTest) {
      const { valueToTest: newValueToTest } = options.hooks.beforeInputRegexTest(oldValue.value, valueToTest);
      valueToTest = newValueToTest;
    }
    if (options?.regex?.input && options?.regex?.input?.test(valueToTest as string) === false) {
      resultValue = oldValue.value;
    }

    if (options?.hooks?.afterInputRegexTest) {
      const { resultValue: newResultValue } = options.hooks.afterInputRegexTest(resultValue);
      resultValue = newResultValue;
    }

    if (inputRef.value) {
      value.value = resultValue;
      inputRef.value.value = resultValue as string;
    }
    emits("change", resultValue);
  }
};

const onFocusout = () => {
  isValid.value = options?.regex?.focusout?.test(value.value as string) ?? options.regex?.input?.test(value.value as string) ?? false;
  isFocused.value = false;
  emits("focusout", {
    isValid: isValid.value,
    value: value.value as string,
  });
};
</script>
<template>
  <input
    ref="inputTemplate"
    v-model="value"
    :readonly="readonly"
    :autofocus="autofocus"
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :inputmode="inputMode"
    :maxlength="maxLength"
    :dir="ltr ? 'ltr' : ''"
    :disabled="disabled"
    @focusout="onFocusout"
    @beforeinput="onBeforeInput"
    @focus="
      () => {
        isFocused = true;
        emits('focus');
      }
    "
    @input="onInput"
    @keydown.enter.exact.stop="emits('pressEnter')"
    :data-is-valid="isValid" />
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
