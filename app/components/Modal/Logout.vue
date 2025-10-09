<script setup lang="ts">
const open = defineModel({ default: false });
</script>
<template>
  <ModalBase class="!p-0 *:!max-h-60" v-model="open">
    <div class="flex h-full w-full flex-col items-center justify-between gap-2 pt-10 pb-4">
      <div class="flex-center flex-col gap-2">
        <p class="font-semibold">{{ $t("end_session") }}</p>
        <p class="font-mediu mt-2 mb-4 text-sm" dir="auto">{{ $t("are_you_sure_you_want_to_log_out") }}</p>
      </div>
      <div class="flex w-full flex-col gap-3 px-4">
        <BtnDarkRed class="!h-10 w-full !bg-red-600/90 text-white" @click="$accountStore().logout">{{ $t("logout") }}</BtnDarkRed>
        <BtnOutline class="!h-10 w-full" @click="open = false">{{ $t("cancel") }}</BtnOutline>
      </div>
    </div>
  </ModalBase>
</template>
