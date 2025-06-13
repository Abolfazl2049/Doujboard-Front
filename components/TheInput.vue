<script setup lang="ts">
const value = defineModel();
const {type, label} = defineProps({
  type: {
    type: String,
    default: "text"
  },
  label: String,
  id: String,
  maxLength: Number
});
</script>
<template>
  <div class="flex flex-col w-full mt-3">
    <span :id="id" class="text-lg uppercase mb-2">
      {{ label }}
    </span>
    <input :id="id" v-model="value" class="border rounded-lg p-4" :type="type" :maxlength="maxLength" />
  </div>
</template>
