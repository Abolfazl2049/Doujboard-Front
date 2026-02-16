<script lang="ts">
enum TableHeaderType {
  simple,
  featured,
}

interface TableHeaderProps {
  title?: string;
  description?: string;
  type?: keyof typeof TableHeaderType;
  features?: {
    filter?: boolean;
    sort?: boolean;
  };
}
export type { TableHeaderType, TableHeaderProps };
</script>
<script setup lang="ts">
import { SEARCH_DEBOUNCE_DELAY } from "../Input/Search.vue";

const search = defineModel("search", { default: "" });
const route = useRoute();
const searchDebounced = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

const { features = { filter: false, sort: false } } = defineProps<TableHeaderProps>();

const emit = defineEmits<{
  add: [];
}>();

const showModal = ref({
  filter: false,
  sort: false,
});

onMounted(() => {
  search.value = (route.query.search as string) || "";
  // double watch here, i know...
  watch(searchDebounced, (s) => {
    navigateTo({
      query: {
        ...route.query,
        search: s,
        page: 1,
      },
    });
  });
  watch(
    () => route.query.search,
    (s) => {
      if (s !== search.value) search.value = s as string;
    },
  );
});
</script>
<template>
  <div class="my-5 flex justify-between px-3 max-lg:flex-col" v-if="type === 'featured'">
    <div class="flex gap-1 max-lg:flex-wrap max-lg:gap-2">
      <div class="border-mercury flex items-center rounded-full border px-4 max-lg:w-full">
        <CSharedISearch class="size-4" />
        <InputBase v-model="search" placeholder="Search..." class="ml-2 h-(--btn-h) w-[200px]" />
      </div>
      <div class="ml-2 flex gap-1 max-lg:ml-0 max-lg:w-full">
        <BtnBase
          v-if="features.filter"
          class="border-gradient-primary w-20 before:rounded-3xl max-lg:w-1/2"
          @click="showModal.filter = true">
          <div class="flex h-full items-center justify-center gap-1">
            <CSharedIFilter />
            Filter
          </div>
        </BtnBase>
        <BtnPrimary v-if="features.sort" class="!rounded-3xl max-lg:w-1/2" @click="showModal.sort = true">
          <div class="flex h-full items-center justify-center gap-1 px-4 font-normal">
            <CSharedISort />
            Sort
          </div>
        </BtnPrimary>
      </div>
    </div>
    <div class="flex items-center gap-2 max-lg:mt-2 max-lg:w-full max-lg:*:w-full">
      <slot name="beside-title"> </slot>
      <BtnPrimary v-if="title" @click="emit('add')">
        <div class="flex items-center gap-1 px-3">
          <CSharedIPlus class="max-lg:hidden" />
          Add
          {{ title }}
        </div>
      </BtnPrimary>
    </div>
  </div>

  <div class="flex-between mt-6 mb-2 px-2 max-lg:flex-col max-lg:items-end! max-lg:gap-4" v-else-if="type === 'simple'">
    <div class="flex-col gap-1">
      <div class="flex items-center gap-2 text-sm">
        <slot name="icon" />
        <p>{{ title }}</p>
      </div>
      <p class="text-[13px] text-[#4A5565]">{{ description }}</p>
    </div>
    <slot name="btn"></slot>
  </div>

  <!-- modals -->
  <Modal v-model="showModal.filter">
    <div class="-mx-4.5 mb-4.5 flex items-center justify-between border-b border-black/10 pr-4.5 pb-5.5">
      <span
        class="before:bg-primary text-cod-gray-200 relative pl-2 text-2xl font-semibold before:absolute before:left-0 before:h-8 before:w-1 before:rounded-xl">
        Filters
      </span>
      <div
        class="flex cursor-pointer items-center gap-1"
        @click="
          () => {
            navigateTo({ query: {} });
            showModal.filter = false;
          }
        ">
        <CSharedIRevert />
        <span class="text-river-bed"> Reset </span>
      </div>
    </div>
    <slot name="filter" :close="() => (showModal.filter = false)" />
  </Modal>
  <Modal v-model="showModal.sort">
    <div class="-mx-4.5 mb-4.5 flex items-center justify-between border-b border-black/10 pr-4.5 pb-5.5">
      <span
        class="before:bg-primary text-cod-gray-200 relative pl-2 text-2xl font-semibold before:absolute before:left-0 before:h-8 before:w-1 before:rounded-xl">
        Sort By
      </span>
      <div
        class="flex cursor-pointer items-center gap-1"
        @click="
          () => {
            navigateTo({ query: {} });
            showModal.sort = false;
          }
        ">
        <CSharedIRevert />
        <span class="text-river-bed"> Reset </span>
      </div>
    </div>
    <slot name="sort" :close="() => (showModal.sort = false)"> </slot>
  </Modal>
</template>
