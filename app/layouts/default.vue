<script setup lang="ts">
import { usePublicStore } from "~/core/@services/public/store";

const publicStore = usePublicStore();
</script>
<template>
  <main
    id="default-layout-con"
    class="group flex max-h-[100dvh] min-h-[100svh] flex-col overflow-y-auto"
    :data-has-bottom-nav="RouteRegistry.findRouteByPath($route.path)?.options.bottomNav.show"
    :data-nav-variant="RouteRegistry.findRouteByPath($route.path)?.options.topNav.variant?.toLowerCase()">
    <LayoutTopNav />
    <div class="default-layout-page-parent" :key="`page-key-${publicStore.pageKeyUpdateCount}`">
      <slot />
    </div>
    <LayoutBottomNav />
    <FullScreenPausedAccount />
  </main>
</template>
