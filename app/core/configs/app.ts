import type { NuxtConfig } from "nuxt/schema";
export const appConfig: NuxtConfig["app"] = {
  head: {
    title: "Doujboard | Share your links !",
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/media/images/app-logo.png",
      },
    ],
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
      {
        name: "theme-color",
        content: "#f85206",
      },
      {
        name: "description",
      },
    ],
  },
  pageTransition: {
    name: "page-default",
    mode: "out-in",
  },
};
