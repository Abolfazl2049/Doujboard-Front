<script setup lang="ts">
import { useAccountStore } from "./core/@services/account/store";

const err = useError();
const accountStore = useAccountStore();
const canBackToHome = computed(() => accountStore.isLogin);
const removeTokenNSendToLogin = () => {
  accountStore.logout();
  navigateTo({ path: "/auth/signin", replace: true });
};
</script>
<template>
  <div>
    <NuxtLayout :name="false">
      <div class="flex-center h-svh flex-col border">
        <p class="mb-3 text-4xl font-semibold">{{ err?.statusCode }}</p>
        <p class="text-center text-3xl font-medium max-lg:text-2xl">{{ err?.message }}</p>
        <!-- <p class="text-xs text-left">{{ err?.message }}</p> -->
        <div class="mt-4 flex w-1/3 items-center gap-3 *:w-full max-lg:w-[95%]">
          <BtnPrimary @click="canBackToHome ? navigateTo('/') : reloadNuxtApp({ ttl: 0 })">
            {{ canBackToHome ? "Home" : "Try Again" }}
          </BtnPrimary>
          <BtnOutline @click="removeTokenNSendToLogin">Logout</BtnOutline>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
