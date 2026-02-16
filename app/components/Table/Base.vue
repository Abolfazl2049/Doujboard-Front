<script lang="ts">
interface Column {
  name: string;
  key?: string;
  formatter?: (s: any) => string;
  options?: {
    ltr?: boolean;
  };
  align?: "center" | "left";
  dataType?: "Date" | "Number" | "String" | "Variant";
  hasSort?: boolean;
  thAttrs?: Record<string, any>;
  data?: any;
}
export interface BaseTableProps {
  columns: Column[];
  showLength?: boolean;
  showIndex?: boolean;
  selectable?: boolean;
  trAttrs?: (row: any) => Record<string, any>;
}
export type { Column };
</script>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import type { PropType } from "vue";
import { flatten } from "flat";
const rows = defineModel("rows", { type: Array as PropType<T[]>, required: true, default: [] });
const isFetched = defineModel<boolean>("isFetched", { default: true });

defineProps<BaseTableProps>();

const selectedLocalSort = ref<Column>();
const selectedRows = defineModel<T[]>("selectedRows", { default: [] });

const getOgRow = (id: number | string) => {
  return rows.value.find((row) => row.id === id);
};

const sortRows = (a: T, b: T) => {
  const dataType = selectedLocalSort.value?.dataType;
  if (!selectedLocalSort.value) return 0;
  switch (dataType) {
    case "Number":
      return b[selectedLocalSort.value.key as keyof typeof b] - a[selectedLocalSort.value.key as keyof typeof a];
    case "Date":
      return (
        new Date(a[selectedLocalSort.value.key as keyof typeof a]).getTime() -
        new Date(b[selectedLocalSort.value.key as keyof typeof b]).getTime()
      );
    case "Variant":
      return String(a[selectedLocalSort.value.key as keyof typeof a]?.displayName).localeCompare(
        String(b[selectedLocalSort.value.key as keyof typeof b]?.displayName),
      );
    case "String":
    default:
      return String(a[selectedLocalSort.value.key as keyof typeof a]).localeCompare(
        String(b[selectedLocalSort.value.key as keyof typeof b]),
      );
  }
};

const rowsComputed = computed<T[]>(() => {
  const flattened = rows.value.map((i) => flatten(i)) as T[];
  if (selectedLocalSort.value) {
    return flattened.toSorted(sortRows);
  } else return flattened;
});

const onSelect = (row: T) => {
  const found = selectedRows.value.find((r) => r.id === row.id);
  if (found) {
    selectedRows.value = selectedRows.value.filter((r) => r.id !== row.id);
  } else {
    selectedRows.value.push(row);
  }
};

const selectAll = () => {
  if (selectedRows.value.length === rowsComputed.value.length) {
    selectedRows.value = [];
  } else {
    selectedRows.value = [...rowsComputed.value];
  }
};
</script>

<template>
  <!-- table  -->
  <div class="max-h-[calc(var(--table-body-height)+60px)] overflow-auto">
    <table class="w-full min-w-[900px]">
      <!-- thead  -->
      <thead>
        <tr class="sticky -top-0.5 z-1">
          <th v-if="showIndex">ID</th>
          <th class="pr-2 pl-3" v-if="selectable">
            <Checkbox
              @update:model-value="selectAll"
              :model-value="selectedRows.length === rowsComputed.length && isFetched" />
          </th>
          <th
            class="norm-th group min-w-[100px]"
            v-for="c in columns"
            :data-selected="selectedLocalSort?.key === c.key ? true : undefined"
            :aria-align="c.align"
            @click="
              () => {
                if (c.hasSort) {
                  if (selectedLocalSort?.key === c.key) selectedLocalSort = undefined;
                  else selectedLocalSort = c;
                }
              }
            "
            :key="c.key"
            v-bind="c.thAttrs">
            <div
              class="group-data-selected:text-primary flex items-center justify-center gap-1 whitespace-nowrap group-aria-[align=left]:justify-start">
              {{ c.name }}
              <CSharedIArrowBroken class="group-data-selected:**:fill-primary" v-if="c.hasSort" />
            </div>
          </th>
        </tr>
      </thead>
      <!-- tbody -->
      <tbody v-if="rowsComputed?.length">
        <tr v-for="(r, index) in rowsComputed as Record<string, any>" v-bind="trAttrs?.(getOgRow(r.id))" :key="index">
          <td v-if="showIndex">
            <div class="index-indicator text-center">#{{ index + 1 }}</div>
          </td>
          <td class="pl-3" v-if="selectable">
            <Checkbox
              :model-value="Boolean(selectedRows.find((row) => row.id === r.id))"
              @update:model-value="onSelect(getOgRow(r.id)!)" />
          </td>
          <td
            v-for="d in columns"
            :aria-align="d.align"
            :key="d.key"
            class="group px-1.5 py-4.5 text-center first:pl-6">
            <!-- handle status -->
            <div class="flex justify-center group-aria-[align=left]:justify-start! max-lg:text-sm">
              <slot :name="`td-${d.key}`" :value="getOgRow(r.id)" :column="d">
                <span v-if="d.formatter" class="whitespace-nowrap">
                  {{ d.formatter(d.key ? r[d.key] : r) }}
                </span>
                <span v-else-if="d.key" class="whitespace-nowrap">
                  {{ r[d.key] ? r[d.key] : "-" }}
                </span>
              </slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-if="rowsComputed?.length === 0">
      <div v-if="isFetched" class="flex-center h-[var(--table-body-height)] flex-col">
        <DataEmpty />
      </div>
      <div v-else class="animate-pulse space-y-3.5 px-4 pt-3.5">
        <div v-for="i in 10" :key="i" class="flex h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </template>
  </div>
</template>
<style>
.table-con {
  --table-body-height: 70svh;
}
</style>
