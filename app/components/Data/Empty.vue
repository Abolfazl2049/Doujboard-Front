<script setup lang="ts">
import emptyListLottie from "~/assets/lotties/empty-box.json";
defineProps({
  message: {
    type: String,
    default: "No Results Found",
  },
});
</script>
<template>
  <div class="flex-center flex-col">
    <Lottie
      :props="{
        animationData: emptyListLottie,
        loop: false,
        width: 200,
        height: 200,
      }" />
    <p class="text-center">
      <slot>{{ message }}</slot>
    </p>
  </div>
</template>
