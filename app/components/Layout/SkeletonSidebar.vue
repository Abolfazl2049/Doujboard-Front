<script setup lang="ts">
defineProps<{
  isSidebarOpen?: boolean;
}>();
</script>

<template>
  <div
    :data-sidebar-open="isSidebarOpen"
    class="group flex-col space-y-2 overflow-auto transition-transform duration-500 *:h-10 *:min-h-10 data-[sidebar-open=false]:pr-1 data-[sidebar-open=true]:px-3">
    <div
      v-for="index in 12"
      :key="index"
      class="group relative flex w-full items-center gap-3 rounded-lg bg-gray-100 transition-all duration-500 group-data-[sidebar-open=false]:!rounded-none">
      <div
        class="flex-center relative *:size-6 *:transition-transform *:duration-500 *:group-data-[sidebar-open=true]:size-5">
        <div class="skeleton size-6 rounded-full bg-gray-600" />
      </div>
      <Transition name="fade">
        <div v-if="isSidebarOpen" class="skeleton h-4 w-24 rounded bg-gray-600" />
      </Transition>
    </div>
  </div>
</template>
<style scoped>
/* Skeleton animation */
.skeleton {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}
@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
