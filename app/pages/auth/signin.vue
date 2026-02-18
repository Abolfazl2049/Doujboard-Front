<script setup lang="ts">
import type { OnBtnClick } from "~/components/Btn/Base.vue";
import { fetchSignin } from "~/core/@services/auth/fetch.utils";

const doFetch: OnBtnClick = (cb) => {
  fetchSignin("hello", "1111").finally(cb);
};
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="flex-center h-screen">
    <Btn enable-loading class="px-12" @click="doFetch"> fetch </Btn>
  </div>
</template>
