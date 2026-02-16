export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("on-viewport-enter", onViewportEnter);
});
