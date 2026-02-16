import type { NuxtConfig } from "nuxt/schema";
export const appConfig: NuxtConfig["app"] = {
  head: {
    title: "Doujboard | Admin Dashboard",
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
      {
        name: "theme-color",
        content: "var(--color-primary)",
      },
      {
        name: "description",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/media/images/favicon-96x96.png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/media/images/favicon.svg",
      },
      {
        rel: "shortcut icon",
        href: "/media/images/favicon.ico",
      },
    ],
  },
  pageTransition: {
    name: "page-default",
    mode: "out-in",
  },
};
