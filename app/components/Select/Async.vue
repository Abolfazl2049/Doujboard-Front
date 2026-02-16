<script lang="ts">
export interface AsyncSelectProps extends SelectProps {
  model: new (init: Record<string, any>) => any;
  fetchFn: (...args: any) => Promise<FetchPaginationRes | Record<string, any>[]>;
  args?: any[];
  filterFn?: (option: any) => boolean;
}
</script>
<script setup lang="ts" generic="Option extends Record<string, any> = PublicModel">
import type { PublicModel } from "~/core/@services/settings/settings.model";
import type { FetchPaginationRes } from "~/core/@services/@shared";
import type { SelectProps } from "./Select.vue";

const { model: Model, fetchFn: fetchOptions, args = [], filterFn } = defineProps<AsyncSelectProps>();
const option = defineModel<Option | Option[]>();
const options = defineModel<Option[]>("options", { default: [] });
const emit = defineEmits<{ load: [records: Option[]] }>();
onMounted(() => {
  if (!options.value.length) {
    fetchOptions(...args, {
      page_size: MAX_PAGE_SIZE,
    }).then((res) => {
      // @ts-ignore
      options.value = ("results" in res ? res.results : res).map((item) => new Model(item));
      if (filterFn) {
        options.value = options.value.filter(filterFn);
      }
      emit("load", options.value);
    });
  }
});
</script>
<template>
  <!-- @vue-generic {Option} -->
  <Select v-bind="$props" v-model="option as any" :options="options as Option[]">
    <template #icon>
      <slot name="icon">
        <CSharedIMapPin />
      </slot>
    </template>
    <template #item="{ item }">
      <slot name="item" :item="item"> </slot>
    </template>
    <template #selectValue>
      <slot name="selectValue"> </slot>
    </template>
  </Select>
</template>
