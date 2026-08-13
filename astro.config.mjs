import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

const site = process.env.PUBLIC_SITE_URL || "https://mantatermica.pe";

export default defineConfig({
  site,
  output: "server",
  adapter: node({ mode: "standalone" }),
  compressHTML: true,
  trailingSlash: "never",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es-PE",
        locales: { "es-PE": "es-PE" },
      },
      filter: (page) => !page.includes("/api/"),
    }),
  ],
  image: {
    domains: [],
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
