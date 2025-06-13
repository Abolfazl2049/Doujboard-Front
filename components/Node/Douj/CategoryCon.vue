<script setup lang="ts">
import {getDoujListApi} from "~/ts/api/douj";

const {category} = defineProps({
  category: {
    type: Object,
    required: true
  }
});
const doujList = ref([]);
const isReceived = ref(false);
onMounted(() => {
  callApi(getDoujListApi, [{category: category.id}])
    .then(res => {
      doujList.value = res.data;
    })
    .finally(() => {
      isReceived.value = true;
    });
});
</script>
<template>
  <div class="pb-6 border-t-2 border-t-gray-400">
    <p class="text-lg font-semibold my-2">
      {{ category.name }}
    </p>
    <div v-if="doujList.length" class="grid grid-cols-5">
      <CardDouj v-for="d in doujList" :douj="d" />
    </div>
    <div class="min-h-[200px] flex-center" v-else-if="isReceived">no douj in this category</div>
    <div class="min-h-[200px] flex-center" v-else>loading</div>
  </div>
</template>
