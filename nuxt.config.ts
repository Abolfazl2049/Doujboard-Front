import tailwindcss from "@tailwindcss/vite";
import { appConfig } from "./app/core/configs/app";
import { i18nConfig } from "./i18n/config";
import { pwaConfig } from "./app/core/configs/pwa";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/tailwind.css", "~/assets/css/fonts.css", "~/assets/css/custom.css", "~/assets/css/index.css", "~/assets/css/utilities.css", "~/assets/css/animation.css"],
  imports: {
    dirs: ["core/utils", "core/constants", "core/types", "core/tools", "core/classes"],
  },
  modules: ["@pinia/nuxt", "motion-v/nuxt", "@vueuse/nuxt", "@nuxtjs/color-mode", "@vueuse/nuxt", "@nuxtjs/i18n", "@vite-pwa/nuxt"],
  runtimeConfig: {
    public: {
      // @ts-ignore
      adminToken: process.env.ADMIN_TOKEN,
      // @ts-ignore
      port: process.env.PORT,
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
  app: appConfig,
  i18n: i18nConfig,
  pwa: pwaConfig,
});
