<script setup lang="ts">
import {PaginationEllipsis, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot} from "reka-ui";
const page = defineModel({type: Number});
const {count = 0} = defineProps<{
  count?: number;
}>();
const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();
</script>

<template>
  <PaginationRoot
    v-model:page="page"
    :total="count"
    :sibling-count="1"
    :items-per-page="30"
    show-edges
    :default-page="1"
    @update:page="emit('update:page', $event)">
    <PaginationList
      v-slot="{items}"
      class="flex items-center justify-end gap-1 text-stone-700 dark:text-white">
      <PaginationPrev class="pagination-item disabled:hidden!"> Previous </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="pagination-item"
          :value="page.value">
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="pagination-item">
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext class="pagination-item disabled:hidden!"> Next </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>
<style scoped>
@reference '~/assets/css/tailwind.css';

.pagination-item {
  @apply border-alto flex-center data-selected:bg-gradient-primary h-9 min-w-9 rounded-lg border px-2 text-[#404040] data-selected:border-none data-selected:text-white;
}
</style>
