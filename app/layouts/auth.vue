<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
</script>

<template>
  <div class="auth-layout min-h-screen bg-white">
    <!-- Centered Form -->
    <div class="flex min-h-screen items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
</style>
