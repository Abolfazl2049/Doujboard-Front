<script setup lang="ts">
import { FormHeader } from "#components";

defineProps<{
  label: string;
  color: string;
}>();
const value = defineModel({ type: Boolean });
</script>
<template>
  <FormHeader class="border-athens-gray rounded-xl border p-2.5 [&_.title]:font-normal" :title="label" :color="color">
    <template #icon>
      <slot name="icon" />
    </template>

    <Switch v-model="value" />
  </FormHeader>
</template>
