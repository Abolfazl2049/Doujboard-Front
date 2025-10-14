import { fetchAccountData } from "./fetch";
import { Account } from "./model";

export const useAccountStore = defineStore("account", () => {
  const data = ref<Account>();
  const isLogin = ref(false);
  const isKicked = ref(false);
  const hasSetup = ref(false);
  const localePath = useLocalePath();
  const fetchData = async () => {
    let res = await fetchAccountData();
    data.value = new Account(res);
    isLogin.value = true;
  };
  const checkAuthStep = (options: { returnPath: boolean; navigateToWhenComplete: string | false } = { returnPath: false, navigateToWhenComplete: "/" }) => {
    const localePath = useLocalePath();
    let path = "";
    switch (data.value?.authStep) {
      case "NAME_COUNTRY":
        path = "/auth/name-country";
        break;
      case "BIRTH_DATE":
        path = "/auth/birth-date";
        break;
      case "GENDER":
        path = "/auth/gender";
        break;
      case "ATTRACTED_TO":
        path = "/auth/attracted-to";
        break;
      case "PHOTO":
        path = "/auth/photo";
        break;
      case "COMPLETE":
        if (options.navigateToWhenComplete) path = options.navigateToWhenComplete;
        break;
    }

    if (options.returnPath) return path;
    else
      navigateTo({
        replace: true,
        path: localePath(path),
      });
  };
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    // You might want to set the token in your fetch client here
    // For now, we'll just store it in localStorage
  };

  const logout = async () => {
    data.value?.clearData();
    data.value = undefined;
    isLogin.value = false;
    localStorage.removeItem("token");
    reInitFetch();
    navigateTo({ path: localePath("/auth/sign-in") });
  };

  return {
    data,
    isLogin,
    isKicked,
    hasSetup,
    fetchData,
    checkAuthStep,
    setToken,
    logout,
  };
});
