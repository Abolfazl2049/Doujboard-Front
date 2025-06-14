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
        class="text-theme base-box"
        :class="{
          'border-theme ': selected === c.id
        }"
        @click="selected = c.id"
      >
        {{ c.name }}
        <IconCheck v-if="selected === c.id" class="absolute left-0.5 bottom-0.5" />
      </div>
      <div class="base-box text-black items-center gap-1 !text-xs" @click="showModal = true"><IconPlusCircleFilled class="size-3" />create new</div>
    </div>
    <div v-else-if="isReceived" class="h-[200px] flex-center">
      <button class="bg-gray-300 rounded-lg px-4 py-1 cursor-pointer" @click="showModal = true">no category ! click to create one</button>
    </div>
    <div v-else>loading</div>
  </div>
  <ModalNewCategory v-model="showModal" @success="getList" />
</template>
<style scoped>
@reference "~/public/css/tailwind.css";
.base-box {
  @apply size-[100px] flex-center relative  text-sm border-[3px] p-2 break-words rounded-lg  cursor-pointer text-center overflow-hidden min-w-[100px];
}
</style>
