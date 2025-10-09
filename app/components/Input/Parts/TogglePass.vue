<script setup lang="ts">
import { Icon } from "@iconify/vue";
const type = defineModel({ default: "password" });
</script>
<template>
  <InputPartsActionCon @click="() => (type = type === 'password' ? 'text' : 'password')">
    <Icon icon="solar:eye-closed-outline" v-if="type === 'password'" class="size-5" />
    <Icon icon="solar:eye-broken" v-else class="relative bottom-px size-5" />
  </InputPartsActionCon>
</template>
