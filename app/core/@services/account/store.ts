import { fetchAccountData, fetchUpdateAccountData } from "./fetch.utils";
import { Account } from "./model";

export const useAccountStore = defineStore("account", () => {
  const data = ref<Account>();
  const isLogin = ref(false);
  const isKicked = ref(false);
  const hasSetup = ref(false);

  const fetchData = async () => {
    const res = await fetchAccountData();
    data.value = new Account(res);
    isLogin.value = true;
  };
  const logout = async (options: { navigate: boolean } = { navigate: true }) => {
    data.value?.clearData();
    data.value = undefined;
    isLogin.value = false;
    clearUserDataInLocalStorage();
    if (options.navigate) navigateTo({ path: "/auth/signin", replace: true });
  };

  const fetchUpdateData = async () => {
    if (data.value) {
      const updatedData = await fetchUpdateAccountData(data.value);
      data.value = new Account(updatedData);
    }
  };
  return {
    data,
    isLogin,
    isKicked,
    hasSetup,
    fetchData,
    logout,
    fetchUpdateData,
  };
});
