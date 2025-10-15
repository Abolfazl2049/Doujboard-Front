<script lang="ts">
const BaseBtnProps = {
  disabled: Boolean,
  enableLoading: {
    default: false,
    type: Boolean,
  },
  bg: {
    default: true,
    type: Boolean,
  },
  variant: {
    default: "filled",
    type: String,
  },
  values: {
    default: [],
    type: Array as PropType<{ [key: string]: any; options?: ValidateValueOptions; condition?: boolean }[]>,
  },
};
interface BaseBtnEmits {
  click: [end: () => void];
}
export type { BaseBtnEmits };
export { BaseBtnProps };
</script>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { ValidateValueOptions } from "~/core/types/validation";
const { disabled, enableLoading, values } = defineProps(BaseBtnProps);

let emits = defineEmits<BaseBtnEmits>();
const loading = defineModel({ default: false });
let sendClickEmit = () => {
  if (!loading.value && !disabled) {
    for (let v of values.filter((v) => v.condition !== false)) {
      let fKey = Object.keys(v)[0];
      let fId = `#${kebabize(fKey as string)}`;
      if (validateValue(v[fKey as string], fId, v.options)) continue;
      else return;
    }
    if (enableLoading) loading.value = true;
    emits("click", () => (loading.value = false));
  }
};
</script>
<template>
  <button :disabled="disabled" @click="sendClickEmit" class="group relative transition-all active:not-disabled:scale-[.99] data-[loading=true]:cursor-not-allowed" :data-loading="loading">
    <div class="a-center-x a-center-y group-data-[loading=true]:flex-center absolute hidden">
      <Icon icon="svg-spinners:3-dots-scale-middle" class="size-6.5" />
    </div>
    <p class="group-data-[loading=true]:opacity-0">
      <slot />
    </p>
  </button>
</template>
