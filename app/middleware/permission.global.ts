import { useAccountStore } from "~/core/@services/account/store";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const accountStore = useAccountStore();
    let isPublic = false;
    const appRoute = RouteRegistry.findRouteByPath(to.path);
    if (appRoute) isPublic = appRoute.options.isPublic;
    if (!isPublic && accountStore.isLogin) {
      if (!accountStore.data?.role.hasAccessToAppSection(appRoute?.section.name))
        return abortNavigation({
          fatal: true,
          message: "You do not have access to this section",
          statusCode: 403,
          cause: "permission",
        });
    }
  }
});
