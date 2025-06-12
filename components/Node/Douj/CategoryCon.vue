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
      doujList.value = res.data.results;
    })
    .finally(() => {
      isReceived.value = true;
    });
});
</script>
<template>
  {{ doujList }}
</template>
