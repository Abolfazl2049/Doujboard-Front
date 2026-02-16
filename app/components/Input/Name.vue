<script setup lang="ts">
const { copy } = defineProps({
  copy: {
    type: Boolean,
    default: false,
  },
});
const name = defineModel({ default: "" });
</script>
<template>
  <Input
    label="Name"
    v-model="name"
    class="mt-12"
    id="name"
    :regex="{
      input: OnlyEngLetterRegex,
      focusout: MinimumThreeNMaximumSeventeenCharsRegex,
    }"
    :hooks="{
      beforeInputRegexTest(resultValue, valueToTest) {
        return {
          valueToTest: removeTwoSpaces(valueToTest),
          resultValue,
        };
      },
      afterInputRegexTest(resultValue) {
        return {
          resultValue: toPascalCase(resultValue)?.replace('  ', ' '),
        };
      },
    }"
    :max-length="17" />
</template>
