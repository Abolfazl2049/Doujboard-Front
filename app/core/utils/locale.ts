import { fetchUpdateAccountData } from "../@services/account/fetch";
import { useAccountStore } from "../@services/account/store";
import { usePublicStore } from "../@services/public/store";

const setLocale = (localeToSet: "fa-IR" | "en-GB") => {
  const { setLocale, setLocaleCookie, t } = useNuxtApp().$i18n;
  const switchLocalePath = useSwitchLocalePath();
  const accountStore = useAccountStore();

  setLocale(localeToSet);
  setLocaleCookie(localeToSet);
  navigateTo(switchLocalePath(localeToSet));

  setTimeout(() => {
    reInitFetch();
    const publicStore = usePublicStore();
    publicStore.fetchSettingsData();
    if (accountStore.isLogin && accountStore.data) {
      if (accountStore.data) accountStore.data.defaultLanguage = localeToSet;
      fetchUpdateAccountData(accountStore.data);
    }
  }, 800);
};
export { setLocale };
