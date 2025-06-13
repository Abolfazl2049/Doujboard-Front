<script setup lang="ts">
import {getDoujCategoryListApi} from "~/ts/api/douj";

let categories = ref([]);
let isReceived = ref(false);
onMounted(() => {
  callApi(getDoujCategoryListApi, [])
    .then(res => {
      categories.value = res.data;
    })
    .finally(() => {
      isReceived.value = true;
    });
});
</script>
<template>
  <div class="h-[100svh]">
    <div class="flex flex-col" v-if="categories.length">
      <NodeDoujCategoryCon v-for="c in categories" :category="c" />
    </div>
    <div v-else-if="isReceived" class="h-full flex-center">
      <NuxtLink to="/new" class="text-blue-600 hover:underline text-2xl font-medium"> you dont have any douj , create your first douj here ! </NuxtLink>
    </div>
    <div v-else class="h-full flex-center">loading</div>
  </div>
</template>
