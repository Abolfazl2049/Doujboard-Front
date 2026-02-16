<script lang="ts">
interface DefaultTableProps extends BaseTableProps {
  headerOptions?: TableHeaderProps;
  count?: number;
}
</script>
<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import type { PropType } from "vue";
import type { BaseTableProps } from "./Base.vue";
import type { TableHeaderProps } from "./Header.vue";
const rows = defineModel("rows", { type: Array as PropType<T[]>, required: true, default: [] });
const isFetched = defineModel("isFetched", { default: true });
const search = defineModel("search", { default: "" });
const selectedRows = defineModel("selectedRows", { type: Array as PropType<T[]>, default: [] });

defineProps<DefaultTableProps>();

const emit = defineEmits<{
  add: [];
}>();
</script>
<template>
  <div
    class="border-alto table-con group w-full overflow-x-auto rounded-2xl border bg-white data-[optional-header=true]:pt-5">
    <slot name="header">
      <TableHeader v-bind="headerOptions" @add="emit('add')" v-model:search="search">
        <template #beside-title>
          <slot v-if="selectedRows.length" name="selected-condition"> </slot>
        </template>
        <template #btn> <slot name="header-btn"></slot> </template>
        <template #filter="{ close }"><slot name="filter" :close="close"></slot></template>
        <template #sort="{ close }"><slot name="sort" :close="close"></slot></template>
        <template #icon> <slot name="header-icon"></slot> </template>
      </TableHeader>
    </slot>
    <!-- table  -->
    <TableBase
      v-bind="$props"
      class="default-table"
      v-model:is-fetched="isFetched"
      v-model:rows="rows"
      v-model:selected-rows="selectedRows">
      <template v-for="c in columns" :key="String(c.key)" v-slot:[`td-${String(c.key)}`]="slotProps">
        <!-- re-expose the slot from wrapper to parent -->
        <slot :name="`td-${String(c.key)}`" v-bind="slotProps" />
      </template>
    </TableBase>
    <div class="border-alto border-t py-2.5 pr-4">
      <Pagination
        :count="count as number"
        @update:page="
          (p) =>
            navigateTo({
              query: {
                ...$route.query,
                page: p,
              },
            })
        " />
    </div>
  </div>
</template>
<style>
@reference '~/assets/css/tailwind.css';
.default-table thead tr {
  @apply bg-white shadow-[0_-2px_0_0_#e5e7eb,0_1px_0_0_#e5e7eb] *:py-3 **:font-medium *:first:rounded-r-xl *:last:rounded-l-xl;
}
.default-table .norm-th {
  @apply cursor-pointer text-xs text-[#797B82] first:pl-3;
}
.default-table tbody {
  @apply divide-mercury divide-y;
}
.default-table tbody tr:hover {
  @apply bg-[#FAFAFA];
}
.default-table .index-indicator {
  @apply w-fit rounded-lg border border-black/10 px-1.5 py-px text-[11px] font-medium;
}
</style>
