import { useAccountStore } from "~/core/@services/account/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();

  if (import.meta.client) {
    // check if route is public

    let isPublic: boolean = false;
    let appRoute = RouteRegistry.findRouteByPath(to.path);
    if (appRoute) isPublic = appRoute.options.isPublic;

    let hasToken = getToken();

    // get profile on app init
    if (nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
      const accountStore = useAccountStore();
      accountStore.hasSetup = localStorage.getItem("has-user-setup") === "true";
      if (isPublic) clearUserDataInLocalStorage();
      else {
        if (hasToken) {
          try {
            await accountStore.fetchData();
            // if (accountStore.data) fetchUpdateAccountData(accountStore.data);
            const localePath = useLocalePath();
            const pathToNavigate = accountStore.checkAuthStep({ navigateToWhenComplete: false, returnPath: true });
            if (pathToNavigate) {
              const localePathToNavigate = localePath(pathToNavigate);
              if (localePathToNavigate !== to.path)
                return navigateTo({
                  replace: true,
                  path: localePathToNavigate,
                });
            }
          } catch (err: any) {
            if (err.status === 403 || err.status === 401) {
              localStorage.removeItem("token");
              accountStore.isKicked = true;
            }
            if (isPublic) toast.error("Error processing data, please try again");
            else {
              return abortNavigation({ message: "Error processing data, please try again", statusCode: 401, fatal: true });
            }
          }
        } else accountStore.isKicked = true;
      }
    }
    // block accessing not public appRoutes
    if (!isPublic && !hasToken) {
      return abortNavigation({ message: "To access this page, please login", statusCode: 401, fatal: true });
    }
  }
});
