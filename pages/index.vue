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
  <div class="">
    <div class="flex flex-col" v-if="categories.length">
      <NodeDoujCategoryCon v-for="c in categories" :category="c" />
    </div>
    <div v-else-if="isReceived">
      <NuxtLink class="text-blue-600 hover:underline"> you dont have any douj , create your first douj here ! </NuxtLink>
    </div>
    <div v-else>loading</div>
  </div>
</template>
