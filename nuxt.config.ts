import fs from "node:fs";
import { i18nLocales } from "./utils/locale";
import getSitemap from "./generate/sitemap";
import makeFetch from "./utils/makeFetch";
import type { MenuResponse } from "./generate/types/routing";
import crawlMenu from "./crawlMenu";

if (process.env.NO_INCREMENTAL_BUILD && fs.existsSync(".dist_cache")) {
  fs.rmSync(".dist_cache", { recursive: true });
}

export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  hooks: {
    "pages:extend": async (routes) => {
      const response = await makeFetch().request("/menus");
      const menus = (await response.json()) as MenuResponse[];

      for (const menu of menus) {
        const [name, language] = menu.label.split("-");
        const isElection = name === "wahlen";
        crawlMenu(menu.nodes, [], language, menu, isElection, routes);
      }
    },
  },
  vite: {
    vue: {
      config: {
        prettify: false,
        productionTip: process.env.NODE_ENV !== "production",
        devtools: process.env.NODE_ENV !== "production",
        performance: process.env.NODE_ENV !== "production",
      },
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    API_TOKEN: process.env.API_TOKEN,
    BASE_URL: process.env.BASE_URL,
    public: {
      searchUrl: process.env.API_URL_SEARCH,
    },
  },
  modules: [
    "@nuxtjs/svg-sprite",
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt3-vuex-module",
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Source Sans Pro": {
            wght: [400, 600, 700],
            ital: [100],
          },
        },
        display: "swap",
      },
    ],
    "@pinia/nuxt",
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
    },
    lazy: true,
    langDir: "lang/",
    locales: i18nLocales,
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
