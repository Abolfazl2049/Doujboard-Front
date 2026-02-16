<script lang="ts">
export interface DefaultBtnProps extends BaseBtnProps {
  bg?: "gray" | "green" | "primary" | "red";
}
</script>
<script setup lang="ts">
import type { BaseBtnEmits, BaseBtnProps } from "./Base.vue";
const { bg = "primary" } = defineProps<DefaultBtnProps>();

const emit = defineEmits<BaseBtnEmits>();
</script>
<template>
  <BtnBase
    :data-bg="bg"
    v-bind="$props"
    class="data-[bg=green]:bg-green-haze bg-primary data-[bg=red]:bg-red h-(--btn-h) rounded-(--btn-radius) font-medium text-white data-[bg=gray]:bg-[#3f3f3f36] data-[bg=red]:shadow-lg"
    @click="(e) => emit('click', e)">
    <slot />
  </BtnBase>
</template>
