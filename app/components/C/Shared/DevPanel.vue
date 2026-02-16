<script setup lang="ts">
import { useAccountStore } from "~/core/@services/account/store";

const accountStore = useAccountStore();
const colorMode = useColorMode();
const setDevToken = () => {
  const adminToken = useRuntimeConfig().public.adminToken;
  if (adminToken) localStorage.setItem("token", adminToken);
  reloadNuxtApp({ ttl: 0, path: "/" });
};
</script>
<template>
  <DevOnly>
    <div class="relative">
      <div class="*:flex-center fixed bottom-12 left-2 z-100 flex flex-col gap-2 *:size-8 *:rounded-full *:bg-black">
        <button @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'">
          <!-- <IconTheme class="size-5" /> -->
        </button>
        <button
          v-if="!accountStore.isLogin"
          @click="setDevToken"
          class="bg-primary size-15 rounded-full text-xs text-white">
          <!-- <IconCheck class="size-5" /> -->
        </button>
      </div>
    </div>
  </DevOnly>
</template>
