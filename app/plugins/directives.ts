import {onViewportEnter} from "~/core/directives/index";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("on-viewport-enter", onViewportEnter);
});
