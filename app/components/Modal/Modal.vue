<script lang="ts">
interface ModalProps extends BaseModalProps {
  class?: string;
  closeIcon?: boolean;
  title?: string;
  description?: string;
  size?: "small" | "medium" | "large";
}
</script>
<script setup lang="ts">
import type { BaseModalProps } from "./Base.vue";

const open = defineModel({ default: false });
const emits = defineEmits(["close", "open"]);

const { dismissible = true, size = "medium" } = defineProps<ModalProps>();
defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <ModalBase v-bind="$props" @close="emits('close')" @open="emits('open')" v-model="open">
    <div
      :data-size="size"
      class="relative my-4 rounded-lg bg-white px-4.5 py-5 data-[size=large]:w-[clamp(300px,100vw-24px,900px)] data-[size=medium]:w-[clamp(300px,100vw-24px,750px)] data-[size=small]:w-[clamp(250px,100vw-24px,500px)] max-lg:px-3.5"
      :class="class">
      <div class="close-icon absolute top-4 right-4 z-10 cursor-pointer" v-if="closeIcon" @click="open = false">
        <CTicketICross class="**:stroke-cod-gray-200! size-5" />
      </div>
      <div v-if="title || description">
        <span class="title-md">{{ title }}</span>
        <span class="description">{{ description }}</span>
      </div>
      <slot />
    </div>
  </ModalBase>
</template>
