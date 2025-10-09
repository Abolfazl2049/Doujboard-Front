<script setup lang="ts">
import { SwitchRoot, SwitchThumb, type SwitchRootProps } from "reka-ui";
const {} = defineProps<SwitchRootProps>();
const switchState = defineModel<boolean>({ default: false });
</script>
<template>
  <div class="flex items-center">
    <SwitchRoot
      v-model="switchState"
      class="data-[state=checked]:bg-gradient-primary relative flex h-6 w-10 items-center rounded-full transition-[background] data-[state=unchecked]:bg-[#D6D6D6] data-[state=unchecked]:dark:bg-[#AAAAAA]"
      :disabled="disabled">
      <SwitchThumb
        class="a-center-y absolute size-5 rounded-full bg-[#656565] transition-all duration-300 data-[state=checked]:left-[57%] data-[state=checked]:bg-white data-[state=unchecked]:left-[2%] dark:bg-white" />
    </SwitchRoot>
  </div>
</template>
