<script setup lang="ts">
import {postDoujApi} from "~/ts/api/douj";

let title = ref();
let description = ref();
let imgs = ref([]);
let category = ref();
let hidden = ref(false);
let submit = (end: Function) => {
  if (checkValue(title.value, "#title") && checkValue(description.value, "#description") && checkValue(imgs.value[0], "#img") && checkValue(category.value, "#category")) {
    callApi(postDoujApi, [title.value, description.value, imgs.value[0].file, category.value ,  hidden.value], {
      navigateTo: "/"
    }).finally(end);
  } else end();
};
</script>
<template>
  <div class="p-12">
    <p class="title">create douj</p>
    <div>
      <TheInput id="title" label="title" v-model="title" />
      <div>
        <p class="font-medium mb-2 mt-3 text-lg">DESCRIPTION</p>
        <textarea v-model="description" class="w-full border rounded-md p-4 min-h-[200px]" id="description" />
      </div>
      <Upload v-model="imgs" title="img" id="img" />
      <SelectCategory v-model="category" />
      <div class="mt-2">
        <input type="checkbox" v-model="hidden" />
        hidden
      </div>
      <Btn @click="submit" />
    </div>
  </div>
</template>
