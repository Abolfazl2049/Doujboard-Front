import { useAccountStore } from "~/core/@services/account/store";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      accountStore: useAccountStore,
    },
  };
});
