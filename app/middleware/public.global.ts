export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();
  if (nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    try {
      await loadAppData();
    } catch {
      return abortNavigation({
        message: "Check your internet connection and try again.",
        statusCode: 500,
        fatal: true,
      });
    }
  }
});
