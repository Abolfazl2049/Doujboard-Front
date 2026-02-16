<script setup lang="ts">
const { title = "Timezone", placeholder = "Select timezone" } = defineProps<{
  title?: string;
  placeholder?: string;
}>();

const timezone = defineModel<string>("");
</script>

<template>
  <!-- @vue-generic {string} -->
  <Select
    v-model="timezone"
    :placeholder="placeholder"
    :options="getAvailableTimezones().map((tz) => tz)"
    :label="title"
    searchable
    headerType="featured">
    <template #icon>
      <slot name="icon">
        <CSharedIClock />
      </slot>
    </template>
    <template #item="{ item }">
      <div class="flex items-center gap-2">
        <span class="text-xs font-medium">{{ item }}</span>
      </div>
    </template>
    <template #selectValue>
      <div v-if="timezone" class="flex items-center gap-2">
        <span class="text-xs font-medium">{{ timezone }}</span>
      </div>
    </template>
  </Select>
</template>
