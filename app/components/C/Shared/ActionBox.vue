<script setup lang="ts">
import type { PropType } from "vue";

const {} = defineProps({
  edit: {
    type: Boolean,
    default: true,
  },
  delete: {
    type: Boolean,
    default: true,
  },
  styleVariant: {
    type: String as PropType<"default" | "colorful">,
    default: "default",
  },
});

const emit = defineEmits<{
  edit: [() => void];
  delete: [() => void];
}>();
</script>
<template>
  <div :data-sv="styleVariant" class="action-box flex h-9 items-center gap-2">
    <BtnBase
      v-if="edit"
      @click="emit('edit', $event)"
      class="flex-center hover-opacity edit-btn h-full min-w-9 rounded-[9px] border border-black/10 bg-white px-2">
      <CSharedIEdit class="size-4" />
      <slot name="edit-content"></slot>
    </BtnBase>
    <slot name="between-btns"></slot>
    <BtnBase
      enable-loading
      v-if="delete"
      @click="emit('delete', $event)"
      class="flex-center hover-opacity delete-btn h-full min-w-9 rounded-[9px] border border-black/10 bg-white">
      <CUserIDetailTrash class="**:stroke-red size-4" />
    </BtnBase>
  </div>
</template>
<style>
.action-box[data-sv="colorful"] .edit-btn {
  @apply border-2 border-[#BEDBFF] bg-[#EFF6FF] [&_svg]:**:stroke-[#155DFC]!;
}
.action-box[data-sv="colorful"] .delete-btn {
  @apply border-2 border-[#FFC9C9] bg-[#FEF2F2] [&_svg]:**:stroke-[#E7000B]!;
}
</style>
