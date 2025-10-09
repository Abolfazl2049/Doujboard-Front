import type { NuxtConfig } from "nuxt/schema";
export const i18nConfig: Partial<NuxtConfig["i18n"]> = {
  defaultLocale: "en-GB",
  locales: [
    {
      code: "en-GB",
      name: "English",
      files: [{ path: "en_home.json" }, { path: "en_alerts.json" }, { path: "en_auth.json" }, { path: "en_public.json" }, { path: "en_route_name.json" }, { path: "en_account.json" }],
      dir: "ltr",
      language: "en-GB",
    },
    {
      code: "fa-IR",
      name: "Farsi",
      files: [{ path: "fa_home.json" }, { path: "fa_alerts.json" }, { path: "fa_auth.json" }, { path: "fa_public.json" }, { path: "fa_route_name.json" }, { path: "fa_account.json" }],
      dir: "rtl",
      language: "fa-IR",
    },
  ],
  strategy: "prefix",
  skipSettingLocaleOnNavigate: true,
  baseUrl: "/",
};
