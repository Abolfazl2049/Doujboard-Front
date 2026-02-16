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
  inputRegexFail: [];
}

interface BaseInputProps {
  placeholder?: string;
  type?: InputHTMLAttributes["type"];
  id?: string;
  disabled?: boolean;
  readonly?: boolean;
  rtl?: boolean;
  autofocus?: boolean;
  maxLength?: number;
  inputMode?: InputHTMLAttributes["inputmode"];
  regex?: Partial<{
    input: RegExp;
    focusout: RegExp;
  }>;
  hooks?: Partial<{
    beforeInputRegexTest: (resultValue: string, valueToTest: string) => { resultValue: string; valueToTest: string };
    afterInputRegexTest: (resultValue: string) => { resultValue: string };
  }>;
}

export type { BaseInputEmits, BaseInputProps };
</script>
<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

const { placeholder, type, id, autofocus, readonly, hooks, regex } = defineProps<BaseInputProps>();
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

    if (hooks?.beforeInputRegexTest) {
      const { valueToTest: newValueToTest } = hooks.beforeInputRegexTest(oldValue.value, valueToTest);
      valueToTest = newValueToTest;
    }
    if (regex?.input && regex?.input?.test(valueToTest as string) === false) {
      resultValue = oldValue.value;
    }

    if (hooks?.afterInputRegexTest) {
      const { resultValue: newResultValue } = hooks.afterInputRegexTest(resultValue);
      resultValue = newResultValue;
    }

    if (inputRef.value) {
      value.value = resultValue;
      inputRef.value.value = resultValue as string;
    }
    emits("change", resultValue);
    if (resultValue === oldValue.value) {
      emits("inputRegexFail");
    }
  }
};

const onFocusout = () => {
  const regexToTest = regex?.focusout ?? regex?.input;
  if (regexToTest) isValid.value = regexToTest.test(value.value as string);
  else isValid.value = value.value.trim().length ? true : false;
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
    :dir="rtl && value ? 'rtl' : 'ltr'"
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
