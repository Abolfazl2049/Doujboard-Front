<script setup lang="ts">
const open = defineModel({ default: false });
const emits = defineEmits(["close"]);

const { enabledClose } = defineProps({
  enabledClose: {
    type: Boolean,
    default: true,
  },
});
defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <Modal :enabled-close="enabledClose" @close="emits('close')" v-model="open">
    <div class="relative w-[clamp(300px,100vw-62px,600px)] rounded-2xl bg-white px-4 pb-4 dark:bg-[#262626]" v-bind="$attrs">
      <IconClose class="absolute top-3 right-3 size-5" @click="open = false" />
      <slot />
    </div>
  </Modal>
</template>
