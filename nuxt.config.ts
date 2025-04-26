// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {enabled: true},
  vite: {
    plugins: [tailwindcss()]
  },
  css: ["/public/css/tailwind.css"],
  imports: {
    dirs: ["ts/store/**", "ts/constants/**", "ts/utils/**"]
  }
});
