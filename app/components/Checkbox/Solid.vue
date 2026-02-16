<script setup lang="ts">
const isChecked = defineModel();
</script>
<template>
  <div class="flex-center relative size-5">
    <input
      type="checkbox"
      v-bind="$attrs"
      class="from-primary to-primary-100 min-h-5 min-w-5 appearance-none rounded-[6px] border bg-white transition-colors duration-300 data-[is-checked=true]:border-none data-[is-checked=true]:bg-linear-[135deg]"
      v-model="isChecked"
      :data-is-checked="isChecked" />
    <Transition name="fade">
      <CUserIDetailCheckV2 class="a-center absolute z-10 size-4" v-if="isChecked" @click="isChecked = !isChecked" />
    </Transition>
  </div>
</template>
