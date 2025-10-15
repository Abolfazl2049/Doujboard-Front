<script setup lang="ts">
import { useAccountStore } from "./core/@services/account/store";

let err = useError();
const accountStore = useAccountStore();
const localePath = useLocalePath();
const { t } = useI18n();

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
          <BtnPrimary class="w-2/3" v-if="err?.statusCode === 401 && accountStore.isKicked" @click="sendToSetup" :enable-loading="false"> {{ $t("sign_in") }}</BtnPrimary>
          <div v-else-if="err?.statusCode === 401" class="flex gap-2">
            <BtnPrimary @click="reloadNuxtApp({ ttl: 0 })">{{ t("try_again") }}</BtnPrimary>
            <BtnPrimary variant="outline" @click="removeTokenNSendToSignin">{{ t("login_again") }}</BtnPrimary>
          </div>
          <BtnPrimary class="w-full" v-else @click="reloadNuxtApp({ ttl: 0, path: localePath('/') })">{{ t("back_to_home") }}</BtnPrimary>
        </div>
        <DevOnly>
          <button v-if="accountStore.isKicked" @click="setDevToken" class="bg-primary fixed bottom-12 left-8 size-15 rounded-full text-xs text-white">{{ t("set_token") }}</button>
        </DevOnly>
      </div>
    </NuxtLayout>
  </div>
</template>
