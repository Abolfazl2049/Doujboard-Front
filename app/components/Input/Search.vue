<script lang="ts">
export const SEARCH_DEBOUNCE_DELAY = 1000;
</script>
<script setup lang="ts">
import type { DefaultInputProps } from "./Input.vue";

const search = defineModel({ default: "" });
const searchDebounced = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
const emit = defineEmits<{
  change: [];
}>();
const props = defineProps<DefaultInputProps>();
const route = useRoute();
onMounted(() => {
  search.value = (route.query.search as string) || "";
  watch(searchDebounced, (s) => {
    navigateTo({
      query: {
        ...route.query,
        search: s,
        page: search.value ? "1" : route.query.page,
      },
    });
    setTimeout(() => {
      emit("change");
    }, 600);
  });
});
</script>
<template>
  <Input v-bind="props" v-model="search" />
</template>
