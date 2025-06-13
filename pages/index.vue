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
  <div class="h-[100svh] p-6">
    <p class="title mb-6">Doujboard</p>
    <div class="flex flex-col" v-if="categories.length">
      <NodeDoujCategoryCon v-for="c in categories" :category="c" />
    </div>
    <div v-else-if="isReceived" class="h-full flex-center">
      <NuxtLink to="/new" class="text-blue-600 hover:underline text-2xl font-medium"> you dont have any douj , create your first douj here ! </NuxtLink>
    </div>
    <div v-else class="h-full flex-center">loading</div>
    <NuxtLink to="/new" v-if="categories.length" class="fixed bottom-6 right-6 rounded-2xl bg-theme text-white p-3"> New Douj </NuxtLink>
  </div>
</template>
