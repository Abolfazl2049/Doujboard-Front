export default defineNuxtRouteMiddleware(async to => {
  const nuxtApp = useNuxtApp();
  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    let isPublicRoute = to.path === "/auth/login" || to.path === "/auth/signup";
    if (!localStorage.getItem("token") && !isPublicRoute) return reloadNuxtApp({path: "/auth/login?redirect=no-account", ttl: 0});
    else if (!isPublicRoute) {
      let account = accountStore();
      await account.getData().catch(() => {
        localStorage.removeItem("token");
        return reloadNuxtApp({
          path: "/auth/login?redirect=error",
          ttl: 0
        });
      });
    } else console.log("test");
  }
});
