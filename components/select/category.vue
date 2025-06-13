<script lang="ts" setup>
import {getDoujCategoryListApi} from "~/ts/api/douj";

let list = ref([]);
let isReceived = ref(false);
const showModal = ref(false);
const selected = defineModel();
let getList = () => {
  list.value = [];
  isReceived.value = false;
  callApi(getDoujCategoryListApi, [])
    .then(res => {
      list.value = res.data;
      if (!selected.value && list.value.length) selected.value = list.value[0].id;
    })
    .finally(() => {
      isReceived.value = true;
    });
};
onMounted(getList);
</script>
<template>
  <div id="category" class="min-h-[200px]">
    <p class="mt-3 mb-2 uppercase text-lg">category</p>
    <div v-if="list.length" class="flex overflow-x-auto gap-3">
      <div
        v-for="c in list"
        class="text-theme text-3xl border-[6px] base-box"
        :class="{
          'bg-theme text-white border-none': selected === c.id
        }"
        @click="selected = c.id"
      >
        {{ c.name }}
      </div>
      <div class="base-box text-black text-2xl border-[4px]" @click="showModal = true">create new</div>
    </div>
    <div v-else-if="isReceived" class="h-[200px] flex-center">
      <div @click="showModal = true">no category ! click to create one</div>
    </div>
    <div v-else>loading</div>
  </div>
  <ModalNewCategory v-model="showModal" @success="getList" />
</template>
<style scoped>
@reference "~/public/css/tailwind.css";
.base-box {
  @apply size-[150px] flex-center p-2 break-words rounded-2xl  cursor-pointer text-center overflow-hidden min-w-[150px];
}
</style>
