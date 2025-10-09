<script setup lang="ts">
import emptyListLottie from "@/assets/lotties/empty.json";
</script>
<template>
  <div class="flex-center flex-col">
    <Lottie
      :props="{
        animationData: emptyListLottie,
        loop: true,
        width: isDesktop() ? 270 : 200,
        height: isDesktop() ? 270 : 200,
      }" />
    <p class="text-center">
      <slot>{{ $t("no_results_found") }}</slot>
    </p>
  </div>
</template>
