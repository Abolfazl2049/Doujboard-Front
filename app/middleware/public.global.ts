import { useAccountStore } from "~/core/@services/account/store";
import { usePublicStore } from "~/core/@services/public/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  if (nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    const accountStore = useAccountStore();
    const publicStore = usePublicStore();
    // await publicStore.fetchSettingsData();
  }
});
