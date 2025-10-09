import Toast, { type PluginOptions } from "vue-toastification";

import "vue-toastification/dist/index.css";
export default defineNuxtPlugin(async ({ vueApp }) => {
  const { POSITION } = await import("vue-toastification");
  const { locale } = useNuxtApp()?.$i18n;
  const options: PluginOptions = {
    timeout: 4000,
    rtl: locale.value === "fa-IR" ? true : false,
    position: POSITION.BOTTOM_RIGHT,
    maxToasts: 3,
    pauseOnHover: false,
  };

  vueApp.use(Toast, options);
});
