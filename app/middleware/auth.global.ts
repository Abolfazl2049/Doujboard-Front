import { fetchAccountData } from "~/core/@services/account/fetch.utils";
import { Account } from "~/core/@services/account/model";
import { useAccountStore } from "~/core/@services/account/store";
import type { UserDto } from "~/core/@services/user/types";

export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  const retrievedAccountDto = useState<UserDto | null>("retrievedAccountDto", () => null);
  const triedToAuth = useState<boolean>("triedToAuth", () => false);
  // check if route is public
  let isPublic = false;
  const appRoute = RouteRegistry.findRouteByPath(to.path);

  if (appRoute) isPublic = appRoute.options.isPublic;

  const token = getAuthToken();
  const accountStore = useAccountStore();

  // get profile on app init
  if (!triedToAuth.value) {
    triedToAuth.value = true;
    if (token) {
      try {
        const res = await fetchAccountData();
        retrievedAccountDto.value = res;
        accountStore.isLogin = true;
      } catch (err: any) {
        consola.error("Failed to fetch account data:", err, "status code", err.status);
        if (err?.status === 403 || err?.status === 401) {
          accountStore.isKicked = true;
          clearUserDataInLocalStorage();
          return navigateTo({ path: "/auth/signin", replace: true });
        }
        if (isPublic) toast.error("Failed to process data login");
        else {
          return abortNavigation({
            message: "Failed to process your account data",
            statusCode: err.statusCode,
            fatal: true,
          });
        }
      }
    } else accountStore.isKicked = true;
  }

  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    // set account data after hydration
    if (retrievedAccountDto.value) {
      accountStore.data = new Account(retrievedAccountDto.value);
    }
  }
  // block accessing private appRoutes
  if (!isPublic && !token) {
    return navigateTo({ path: "/auth/signin", replace: true });
  }
});
