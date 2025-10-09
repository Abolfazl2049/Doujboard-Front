import { useAccountStore } from "~/core/@services/account/store";

export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();
  const localePath = useLocalePath();
  const { t } = useNuxtApp()?.$i18n;
  if (accountStore.data?.authStep === "COMPLETE") {
    toast.warning(t("you_completed_your_auth_step"));
    // return navigateTo({ path: localePath("/"), replace: true });
  }
});
