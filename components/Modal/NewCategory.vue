<script setup lang="ts">
import {postDoujCategoryApi} from "~/ts/api/douj";

let show = defineModel({
  get: v => {
    name.value = "";
    return v;
  }
});
let name = ref();
const emits = defineEmits(["success"]);
let submit = (end: Function) => {
  if (checkValue(name.value, "#name")) {
    callApi(postDoujCategoryApi, [name.value])
      .then(() => {
        emits("success");
        show.value = false;
      })
      .finally(end);
  } else end();
};
</script>
<template>
  <ModalBase v-model="show">
    <div class="min-h-[300px] bg-white rounded-2xl w-[600px] p-12 ">
      <p class="title">Create Category</p>
      <TheInput v-model="name" id="name" label="name" :max-length="12" />
      <Btn @click="submit" />
    </div>
  </ModalBase>
</template>
