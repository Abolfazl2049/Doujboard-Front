<script setup lang="ts">
// import { Icon } from "@iconify/vue/dist/iconify.js";
const {disabled} = defineProps({
  disabled: Boolean
});

let emits = defineEmits(["click"]);
const loading = ref(false);
let sendCLickEmit = () => {
  if (!loading.value && !disabled) {
    loading.value = true;
    emits("click", () => (loading.value = false));
  }
};
</script>
<template>
  <button
    class="bg-theme px-4 w-fit mt-5 cursor-pointer rounded-2xl p-3 text-center text-xl font-semibold text-white transition-all disabled:opacity-60"
    :class="{'cursor-not-allowed opacity-60': disabled}"
    @click="sendCLickEmit"
    :disabled="disabled"
  >
    <div v-if="loading" class="flex-center">
      <!-- <Icon icon="humbleicons:spinner-planet" class="size-7 animate-spin" /> -->
      Loading
    </div>
    <slot v-else> Submit </slot>
  </button>
</template>
