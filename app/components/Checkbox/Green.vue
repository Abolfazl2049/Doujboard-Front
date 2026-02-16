<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

const checked = defineModel({ type: Boolean });
</script>

<template>
  <CheckboxRoot
    v-model="checked"
    class="flex-center group relative size-8 rounded-[10px] bg-[#F3F4F6] outline-none data-[state=checked]:bg-[#DCFCE7]">
    <transition name="fade">
      <CheckboxIndicator class="a-center flex-center absolute size-full rounded-[10px]" v-if="checked">
        <CUserIDetailCheckV2 class="**:stroke-green-haze size-4.5 **:stroke-2" />
      </CheckboxIndicator>
      <p
        class="a-center flex-center absolute size-full cursor-pointer rounded-[10px] text-xs text-[#99A1AF] select-none"
        v-else>
        -
      </p>
    </transition>
  </CheckboxRoot>
</template>
