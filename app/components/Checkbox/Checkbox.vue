<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

const value = defineModel({ type: Boolean });
</script>

<template>
  <CheckboxRoot
    v-model="value"
    class="data-[state=checked]:bg-primary group relative flex appearance-none items-center justify-center rounded-2xl bg-white shadow-sm outline-none">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.7529 0C17.5899 0 20 2.39197 20 6.25293V8.82227C19.9999 9.2391 19.661 9.57805 19.2441 9.57812H19.2354V9.55957C18.8134 9.55957 18.4707 9.21887 18.4697 8.79688V6.25293C18.4697 3.19997 16.7998 1.53027 13.7559 1.53027H6.25586C3.20997 1.53033 1.5303 3.21002 1.53027 6.25293V13.7529C1.53027 16.7869 3.20997 18.4668 6.25293 18.4668H13.7529C16.7959 18.4668 18.4668 16.7869 18.4668 13.7529C18.4668 13.331 18.8094 12.9883 19.2324 12.9883C19.6552 12.9885 19.997 13.3311 19.9971 13.7529C20.0001 17.6079 17.6079 20 13.7559 20H6.25293C2.39197 20 0 17.6078 0 13.7559V6.25586C5.80533e-05 2.39197 2.39202 2.89501e-05 6.25293 0H13.7529Z"
        class="group-data-[state=checked]:fill-primary fill-[#A3A3A3]" />
    </svg>

    <CheckboxIndicator class="a-center absolute">
      <Icon icon="radix-icons:check" class="h-5 w-5 text-white" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
