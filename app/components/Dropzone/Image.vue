<script lang="ts">
interface ImageDropzoneProps extends HeadlessDropzoneProps {
  label?: String;
  placeholder?: string;
  required?: boolean;
}
</script>
<script setup lang="ts">
import type { MyFile } from "~/core/@services/@shared/types/component";
import type { HeadlessDropzoneProps } from "./Headless.vue";
const { label, required = false, placeholder = "Upload country flag" } = defineProps<ImageDropzoneProps>();
const emit = defineEmits(["upload"]);

const file = defineModel<MyFile | null>();
</script>
<template>
  <div :data-uploaded="file ? true : undefined" class="group flex flex-col gap-1 text-[13px]">
    <div class="label input-label flex gap-1">
      <p>{{ label }}</p>
      <p class="text-red" v-if="required">*</p>
    </div>
    <DropzoneHeadless
      v-bind="$props"
      v-model="file"
      class="flex-center w-full flex-col overflow-hidden rounded-[10px] border-2 border-[#D1D5DC] py-3.5">
      <template #default="{ triggerUpload }">
        <div class="group-data-uploaded:opacity-0">
          <slot name="placeholder">
            <div class="flex flex-col items-center text-xs text-[#4A5565] select-none">
              <CSharedIUploadV2 class="-mt-1 size-12" />
              <p>{{ placeholder }}</p>
            </div>
          </slot>
        </div>
      </template>
    </DropzoneHeadless>
  </div>
</template>
