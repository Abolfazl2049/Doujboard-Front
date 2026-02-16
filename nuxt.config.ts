import tailwindcss from "@tailwindcss/vite";
import { appConfig } from "./app/core/configs/app";
import { fileURLToPath } from "url";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/fonts.css",
    "~/assets/css/custom.css",
    "~/assets/css/index.css",
    "~/assets/css/utilities.css",
    "~/assets/css/animation.css",
  ],

  imports: {
    dirs: ["core/@services/@shared", "core/libs"],
  },

  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@nuxtjs/color-mode", "@vueuse/nuxt", "nuxt-security", "@nuxt/eslint"],

  runtimeConfig: {
    public: {
      adminToken: process.env.ADMIN_TOKEN,
      port: process.env.PORT,
    },
  },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  app: appConfig,

  alias: {
    services: fileURLToPath(new URL("./app/core/@services", import.meta.url)),
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": ["'self'", "https:", "http:", "data:", "blob:"],
        "upgrade-insecure-requests": false,
      },
    },
  },
});
