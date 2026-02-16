<script setup lang="ts">
const type = defineModel({ default: "password" });
</script>
<template>
  <InputPartsActionCon @click="() => (type = type === 'password' ? 'text' : 'password')">
    <div class="relative flex items-center justify-end">
      <Transition name="fade">
        <CSharedIEye v-if="type === 'password'" class="absolute size-5" />
        <CSharedIEyeSlash v-else class="absolute size-5" />
      </Transition>
    </div>
  </InputPartsActionCon>
</template>
