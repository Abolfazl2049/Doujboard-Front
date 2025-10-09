<!-- props -->

<script setup lang="ts">
import warningLottie from "@/assets/lotties/Warning.json";

defineProps({
  description: String,
  btnTitle: String,
});
let open = defineModel("open", { default: false });
const emit = defineEmits<{
  submit: [];
}>();
</script>
<template>
  <Drawer v-model:open="open" class="!min-h-[200px]">
    <div class="flex flex-col px-7 pt-6">
      <ClientOnly>
        <Lottie
          class="mx-auto -my-7"
          :props="{
            animationData: warningLottie,
            loop: false,
            width: 120,
            height: 120,
          }" />
      </ClientOnly>
      <div class="my-3 mb-2 w-full flex-col">
        <p class="w-full text-center text-lg font-semibold">{{ $t("warning") }}</p>
        <p class="mt-2 w-full text-center text-sm leading-5.5 whitespace-pre-line">{{ description }}</p>
      </div>
      <BtnPrimary class="mt-1 !h-9" @click="emit('submit')">{{ btnTitle }}</BtnPrimary>
    </div>
  </Drawer>
</template>