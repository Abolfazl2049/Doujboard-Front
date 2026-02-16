<script setup lang="ts">
const {} = defineProps({
  title: String,
  label: String,
  content: String,
});
</script>
<template>
  <div class="flex w-full items-start gap-4 max-lg:flex-col max-lg:gap-2">
    <CSharedIInfoV2 class="flex-shrink-0 max-lg:size-5" />
    <div class="-mt-1 w-full flex-col gap-1.5 max-lg:mt-0 max-lg:gap-1">
      <p class="text-[21px] font-light !text-black max-lg:text-lg" v-text="title" />
      <div
        v-if="label"
        class="w-full flex-col gap-3 rounded-xl border border-[#2196F3] bg-[#2196F326] px-3.5 py-2.5 max-lg:gap-2 max-lg:px-2.5 max-lg:py-2">
        <p class="text-[15px] font-semibold text-[#003C6C] max-lg:text-sm" v-text="label" />
        <p class="text-[13.5px] font-light text-[#003C6C] max-lg:text-xs" v-text="content" />
      </div>
    </div>
  </div>
</template>
