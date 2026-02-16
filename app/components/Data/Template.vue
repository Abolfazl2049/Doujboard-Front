<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { FetchPaginationRes } from "~/core/@services/@shared/types/fetch";

const {
  data,
  model,
  fillArr,
  fetchFn,
  args = [],
  pagination,
  query,
  loadMore = true,
} = defineProps<{
  data?: any;
  emptyConAttrs?: Record<string, any>;
  fillArr?: (records: any[]) => void;
  fetchFn?: (...args: any[]) => Promise<FetchPaginationRes | Record<string, any>[]>;
  model?: new (data: any) => any;
  args?: any[];
  pagination?: boolean;
  query?: Record<string, any>;
  loadMore?: boolean;
  noEmptyTemplate?: boolean;
}>();
const emit = defineEmits<{
  load: [records: any[]];
}>();
const list = defineModel<any[]>("list");
const isFetching = ref(false);
const page = ref(0);
const hasMore = ref(false);
const isFetched = defineModel<boolean>("isFetched");

const fetchData = () => {
  isFetching.value = true;
  fetchFn?.(...args, { ...query, page: page.value + 1 })
    .then((res) => {
      page.value++;
      isFetched.value = true;
      const results = "results" in res ? res.results : res;
      hasMore.value = Boolean("next" in res ? res.next : false);
      if (fillArr) fillArr(results);
      else list.value = list.value?.concat(results.map((i) => (model ? new model(i) : i)));
      emit("load", list.value || []);
    })
    .finally(() => {
      isFetched.value = true;
      isFetching.value = false;
    });
};
onMounted(() => {
  if (pagination) fetchData();
});
</script>
<template>
  <slot v-if="Array.isArray(data) ? data?.length : data || (pagination && list?.length)"></slot>
  <slot v-else-if="isFetched" name="empty">
    <DataEmpty v-if="!noEmptyTemplate" v-bind="emptyConAttrs" />
  </slot>
  <slot v-else name="loading"> </slot>
  <div
    class="group relative bottom-12 mx-auto w-fit data-[is-fetching=true]:bottom-0 data-[is-fetching=true]:mt-6 data-[is-fetching=true]:mb-2"
    v-if="isFetched && hasMore && list?.length && pagination && loadMore"
    :data-is-fetching="isFetching"
    v-on-viewport-enter="
      () => {
        if (!isFetching) fetchData();
      }
    ">
    <Icon icon="ei:spinner-3" class="hidden size-5 animate-spin group-data-[is-fetching=true]:block" />
  </div>
</template>
