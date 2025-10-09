<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";
import { VueScrollPicker, type VueScrollPickerValue } from "vue-scroll-picker";
import "vue-scroll-picker/style.css";
const isOpen = defineModel("open", { default: false });
const value = defineModel("value", { default: null, type: Number || String });
const emit = defineEmits<{
  submit: [number];
}>();
const { options, defaultValue } = defineProps({
  options: Array as PropType<number[]>,
  defaultValue: Number,
});
onMounted(() => {
  if (defaultValue) value.value = defaultValue;
});
</script>
<template>
  <Drawer v-model:open="isOpen">
    <div>
      <VueScrollPicker class="my-picker !h-[300px] min-w-[180px] text-[24px]" :options="options" v-model="value" />
      <div class="mx-auto mt-6 flex w-[95%] gap-2">
        <BtnGray class="flex-1" @click="isOpen = false">
          {{ $t("cancel") }}
        </BtnGray>
        <BtnPrimary
          class="mx-auto  flex-1"
          @click="
            () => {
              isOpen = false;
              emit('submit', value);
            }
          ">
          {{ $t("pick") }}
        </BtnPrimary>
      </div>
    </div>
  </Drawer>
</template>
<style>
@reference '~/assets/css/tailwind.css';

/* public  */
.vue-scroll-picker-layer-top,
.vue-scroll-picker-layer-bottom {
  @apply border-none bg-none;
}
.vue-scroll-picker-layer-selection {
  @apply border-primary h-[60px] !border-y-3;
}
.vue-scroll-picker-item {
  @apply text-transparent;
}
.vue-scroll-picker-item[aria-selected="true"] {
  @apply text-primary-200 scale-115 font-extrabold transition-all;
}

.my-picker .vue-scroll-picker-item[aria-selected="true"] {
  @apply text-primary;
}
.my-picker .vue-scroll-picker-rotator {
  @apply space-y-4;
}
</style>
