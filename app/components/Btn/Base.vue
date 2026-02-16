<script lang="ts">
interface BaseBtnEmits {
  click: [end: () => void];
  disabledClick: [];
}

interface BaseBtnProps {
  disabled?: boolean;
  enableLoading?: boolean;
  values?: Array<{
    [key: string]: any;
    options?: ValidateValueOptions;
    condition?: boolean;
    failedOptions?: OnValueValidateFailOptions;
  }>;
  stopPropagation?: boolean;
}

type OnBtnClick<T extends any[] = any[]> = (finish: () => void, ...args: T) => any;
export type { BaseBtnEmits, BaseBtnProps, OnBtnClick };
</script>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { OnValueValidateFailOptions, ValidateValueOptions } from "~/core/@services/@shared/types/validation";
const { disabled, enableLoading, values = [], stopPropagation } = defineProps<BaseBtnProps>();

const emits = defineEmits<BaseBtnEmits>();
const loading = defineModel({ default: false });
const sendClickEmit = (e: MouseEvent) => {
  if (!loading.value && !disabled) {
    if (stopPropagation) e.stopPropagation();
    for (const v of values.filter((v) => v.condition !== false)) {
      const fKey = Object.keys(v)[0];
      const fId = `#${toKebabCase(fKey as string)}`;
      if (validateValue(v[fKey as string], fId, v.options, v.failedOptions)) continue;
      else return;
    }
    if (enableLoading) loading.value = true;
    emits("click", () => (loading.value = false));
  }
};
</script>
<template>
  <button
    :disabled="disabled"
    @click="sendClickEmit"
    class="group relative rounded-(--btn-radius) transition-all active:not-disabled:scale-[0.99] disabled:bg-[#9C8D91] data-[loading=true]:cursor-not-allowed"
    :data-loading="loading">
    <ClientOnly>
      <div class="a-center-x a-center-y group-data-[loading=true]:flex-center absolute hidden">
        <Icon icon="svg-spinners:3-dots-scale-middle" class="icon size-6.5" />
      </div>
      <div class="mx-auto flex w-fit items-center gap-1 group-data-[loading=true]:opacity-0">
        <slot />
      </div>
      <div class="absolute inset-0 z-[2] hidden group-disabled:block" @click="emits('disabledClick')" />
    </ClientOnly>
  </button>
</template>
