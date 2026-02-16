<script lang="ts">
interface BaseSearchFilterItem {
  key: string;
  props: SelectProps<Record<string, any>> | AsyncSelectProps | DatepickerProps;
  icon?: Component;
  special?: "country" | "datepicker";
  condition?: boolean;
  value?: any;
  valueKey?: string;
  async?: boolean;
}
interface DefaultSearchFilterItem extends BaseSearchFilterItem {
  props: SelectProps<Record<string, any>>;
  async?: undefined | false;
}
interface AsyncSearchFilterItem extends BaseSearchFilterItem {
  props: AsyncSelectProps;
  async: true;
}
interface DatepickerSearchFilterItem extends BaseSearchFilterItem {
  special: "datepicker";
  props: DatepickerProps;
}
type SearchFilterItem = DefaultSearchFilterItem | AsyncSearchFilterItem | DatepickerSearchFilterItem;
</script>
<script setup lang="ts">
import { CGalleryISearch } from "#components";
import type { Variant } from "#imports";
import type { DatepickerProps } from "~/components/Datepicker/Datepicker.client.vue";
import type { AsyncSelectProps } from "~/components/Select/Async.vue";
import type { SelectProps } from "~/components/Select/Select.vue";
import type { PublicModel } from "~/core/@services/settings/settings.model";
const {
  filters = [],
  hasSort = true,
  sortKey = "created_at",
  flexDirection = "row",
  hasSearch = true,
  sortPlaceholder = "Sort by",
  searchPlaceholder = "Search by name...",
} = defineProps<{
  filters?: SearchFilterItem[];
  sortPlaceholder?: string;
  hasSort?: boolean;
  sortKey?: string;
  flexDirection?: "row" | "col";
  hasSearch?: boolean;
  searchPlaceholder?: string;
}>();
const search = defineModel("search", { default: "" });
const route = useRoute();
const isMobileScreen = ref(false);
const emit = defineEmits<{
  change: [];
}>();

const applyFilter = async (filterData: Record<string, string | undefined>) => {
  const newQuery = { ...route.query, ...filterData, page: "1" };
  await navigateTo({
    query: newQuery,
  });
};
onMounted(() => {
  watch(
    () => route.query,
    () => {
      emit("change");
    },
  );
  isMobileScreen.value = !isDesktop();
});
</script>

<template>
  <div class="box flex-col gap-3 !border px-6 pt-3 pb-2 !shadow-none max-lg:px-3.5">
    <!-- header -->
    <div class="flex items-center gap-2">
      <CGalleryIFilter />
      <p class="relative top-px font-medium">
        <template v-if="hasSearch">Search & Filter </template> <template v-else> Filters </template>
      </p>
    </div>

    <div
      :data-is-column="flexDirection === 'col' || isMobileScreen ? true : undefined"
      class="group flex items-center gap-3 **:rounded-md! data-is-column:flex-col data-is-column:flex-wrap">
      <!-- search -->
      <InputSearch
        v-if="hasSearch"
        v-model="search"
        :placeholder="searchPlaceholder"
        :icon="CGalleryISearch"
        size="sm"
        class="flex-1 group-data-is-column:w-full" />
      <div class="flex items-center gap-2 max-lg:w-full" v-if="hasSort">
        <CIssuesISort v-if="!filters.length" />
        <Select
          :placeholder="sortPlaceholder"
          :options="[
            { displayName: 'Newest First', name: `-${sortKey}` },
            { displayName: 'Oldest First', name: sortKey },
          ]"
          size="sm"
          class="w-60! max-lg:w-full!"
          @update:modelValue="(q) => applyFilter({ ordering: q ? (q as Variant).name : undefined })"
          can-clear
          :bounded-key="route.query.ordering as string"
          bind-key="name" />
      </div>

      <!-- filters -->
      <div class="flex gap-1 group-data-is-column:w-full max-lg:flex-col">
        <div
          v-for="(filter, index) in filters.filter((f) => f.condition !== false)"
          class="flex w-60! items-center gap-2 group-data-is-column:w-full!"
          :key="index">
          <!-- icon -->
          <component :is="filter.icon" v-if="filter.icon" />
          <!-- datepicker -->
          <Datepicker
            v-if="filter.special === 'datepicker'"
            con-class="w-full"
            :icon="false as any"
            v-bind="filter.props"
            size="sm"
            class="w-full! border-none!"
            style-variant="bg"
            :label="filter.props.label"
            can-clear
            @update:modelValue="
              (q) =>
                applyFilter({
                  [filter.key]: q || undefined,
                })
            "
            :model-value="$route.query[filter.key]" />
          <!-- select country -->
          <SelectCountry
            v-else-if="filter.special === 'country'"
            can-clear
            v-bind="filter.props"
            size="sm"
            class="!w-full"
            @update:modelValue="
              (q) => {
                applyFilter({
                  [filter.key]: q ? q.id.toString() : undefined,
                });
              }
            "
            :bounded-key="route.query[filter.key] ? Number(route.query[filter.key]) : undefined" />
          <!-- async select -->
          <SelectAsync
            v-else-if="filter.async"
            can-clear
            v-bind="filter.props"
            class="w-full"
            size="sm"
            :model="filter.props.model"
            :fetch-fn="filter.props.fetchFn"
            @update:model-value="
              (q) => {
                applyFilter({
                  [filter.key]: q ? (q as any as PublicModel).id.toString() : undefined,
                });
              }
            "
            label-key="name"
            :bind-key="'id' as any"
            :bounded-key="route.query[filter.key] as string" />
          <!-- default select -->
          <Select
            v-else
            can-clear
            v-bind="filter.props"
            size="sm"
            class="w-full"
            @update:model-value="
              (q) => {
                const qVar = q as Variant;
                if (qVar)
                  applyFilter({
                    [filter.key]: filter.valueKey ? qVar.data![filter.valueKey as keyof Variant['data']] : qVar.key,
                  });
                else
                  applyFilter({
                    [filter.key]: undefined,
                  });
              }
            "
            :bounded-key="route.query[filter.key] as string"
            bind-key="key" />
        </div>
      </div>
    </div>
  </div>
</template>
