import type { NuxtConfig } from "nuxt/schema";
export const pwaConfig: NuxtConfig["pwa"] = {
  manifest: {
    name: "doujboard",
    short_name: "doujboard",
    description: "share your links !",
    theme_color: "#f85206",
    icons: [
      {
        src: "/media/images/app-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/media/images/app-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  workbox: {
    navigateFallback: undefined,
    globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
    maximumFileSizeToCacheInBytes: 70 * 1024 * 1024, // 70MB
    runtimeCaching: [
      {
        // Matches any path on doujboard.uk (with or without www, http or https)
        urlPattern: /^https?:\/\/(www\.)?doujboard\.uk(\/.*)?$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
        },
      },
    ],
  },
  client: {
    installPrompt: true,
  },
};
