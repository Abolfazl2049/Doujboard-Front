<script setup lang="ts">
import { SwitchRoot, SwitchThumb, type SwitchRootProps } from "reka-ui";

const {} = defineProps<
  SwitchRootProps & {
    activeColor?: string;
  }
>();

const switchState = defineModel<boolean>({ default: false });
</script>
<template>
  <div class="relative flex items-center">
    <SwitchRoot
      v-model="switchState"
      class="group relative flex h-6 w-10 items-center rounded-full transition-all data-[state=unchecked]:bg-[#D6D6D6]"
      :disabled="disabled">
      <div
        class="absolute inset-0 rounded-full opacity-0 transition-all group-data-[state=checked]:opacity-100"
        :class="[activeColor ? '' : 'bg-gradient-primary']"
        :style="[activeColor ? `background: ${activeColor};` : '']" />
      <SwitchThumb
        class="a-center-y absolute mx-px size-5 rounded-full bg-[#656565] transition-all duration-300 data-[state=checked]:left-auto data-[state=checked]:translate-x-[17px] data-[state=checked]:bg-white data-[state=unchecked]:left-[2%] dark:bg-white" />
    </SwitchRoot>
  </div>
</template>
