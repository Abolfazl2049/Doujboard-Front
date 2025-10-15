<script setup lang="ts">
import { useAccountStore } from "./core/@services/account/store";

let err = useError();
const accountStore = useAccountStore();
const localePath = useLocalePath();
const isAuthModalOpen = ref(false);
// Modal state
const showAuthModal = computed(() => {
  if (err.value?.statusCode === 401 && accountStore.isKicked) {
    isAuthModalOpen.value = true;
    return true;
  }
});

const setDevToken = () => {
  const adminToken = useRuntimeConfig().public.adminToken;
  if (adminToken) localStorage.setItem("token", adminToken);
  reloadNuxtApp({ ttl: 0 });
};
const removeTokenNSendToSignin = () => {
  accountStore.logout();
  reloadNuxtApp({ path: localePath("/auth/signin"), ttl: 0 });
};
const sendToSetup = () => {
  navigateTo({ path: localePath("/auth/signin"), replace: true });
};
</script>
<template>
  <div>
    <NuxtLayout :name="false">
      <div class="flex-center min-h-[100svh] flex-col">
        <div class="flex-center mx-auto mt-2 w-[95%] flex-col gap-6 lg:mt-4">
          <span class="text-center text-sm lg:text-xl lg:font-medium">
            {{ err?.message ?? 404 }}
          </span>
          <BtnPrimary class="!w-[100px]" v-if="err?.statusCode === 401 && accountStore.isKicked" @click="sendToSetup" :enable-loading="false">Sign In</BtnPrimary>
          <div v-else-if="err?.statusCode === 401" class="flex gap-2 *:w-[100px]">
            <BtnPrimary @click="reloadNuxtApp({ ttl: 0 })">Try Again</BtnPrimary>
            <BtnPrimary variant="outline" @click="removeTokenNSendToSignin">Login Again</BtnPrimary>
          </div>
          <BtnPrimary class="w-[100px]" v-else @click="reloadNuxtApp({ ttl: 0, path: localePath('/') })">Back to Home</BtnPrimary>
        </div>
        <DevOnly>
          <button v-if="accountStore.isKicked" @click="setDevToken" class="bg-primary fixed bottom-12 left-8 size-15 rounded-full text-xs text-white">Set Token</button>
        </DevOnly>
      </div>
    </NuxtLayout>

    <!-- Auth Rules Modal -->
    <LazyModalBase v-if="showAuthModal" v-model="isAuthModalOpen" :enabled-close="false">
      <div class="p-6">
        <div class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h2 class="mb-2 text-xl font-bold text-blue-900">🔐 Oops! You're Not Logged In</h2>
          <p class="text-lg text-blue-700"><span class="font-semibold">💡 Pro Tip:</span> Just provide a username and password - that's it! You're signed up! 🎉</p>
        </div>

        <div class="flex gap-3">
          <BtnPrimary @click="navigateTo(localePath('/auth/signup'))" class="flex-1"> Sign up </BtnPrimary>
        </div>
      </div>
    </LazyModalBase>
  </div>
</template>
