<script setup lang="ts">
import { useAccountStore } from "~/core/@services/account/store";

const open = defineModel({ default: false });
</script>
<template>
  <Modal class="!p-0 *:!max-h-60" v-model="open">
    <div class="flex h-full w-full flex-col items-center justify-between gap-2 pt-10 pb-4">
      <div class="flex-center flex-col gap-2">
        <p class="font-semibold">End session</p>
        <p class="font-mediu mt-2 mb-4 text-sm" dir="auto">Are you sure you want to log out?</p>
      </div>
      <div class="flex w-full flex-col gap-3 px-4">
        <Btn class="!h-10 w-full !bg-red-600/90 text-white" @click="() => useAccountStore().logout()">Logout</Btn>
        <BtnOutline class="!h-10 w-full" @click="open = false">Cancel</BtnOutline>
      </div>
    </div>
  </Modal>
</template>
