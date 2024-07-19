import fs from "node:fs";
import { i18nLocales } from "./utils/locale";
import getSitemap from "./generate/sitemap";
import crawlMenu from "./crawlMenu";
import getRoutes from "./generate/getRoutes";
import generateMenuRoutes from "./generate/menuEntries";
import { useMenuStore } from "./generate/store/menuStore";
import { usePublicationStore } from "./generate/store/publicationStore";
import generateGeneralPublications from "./generate/generalPublications";
import type { NuxtPage } from "nuxt/schema";
import { languages } from "./generate/store/languages";
import getPublicationsRoutes from "./getPublicationsRoutes";
import { useFooterMenuStore } from "./generate/store/footerMenuStore";
import type { NuxtPayload } from "nuxt/app";
import appSetup from "./plugins/appSetup";

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
    async "nitro:config"(nitroConfig) {
      /*         const menuRoutes = await generateMenuRoutes()
                const generalPublications = await generateGeneralPublications()
                const routes = [...menuRoutes, ...generalPublications]
                nitroConfig?.prerender?.routes &&
                nitroConfig.prerender.routes.push(...routes);*/
    },
    ready: async () => {
      console.log("Building...");
      await useMenuStore();
      await usePublicationStore();
    },
    "pages:extend": async (routes) => {
      const menus = await useMenuStore();
      const publications = await usePublicationStore();

      const publicationRoutes = await getPublicationsRoutes(publications);
      for (const menu of menus) {
        const [name, language] = menu.label.split("-");
        const isElection = name === "wahlen";
        crawlMenu(menu.nodes, [], language, menu, isElection, routes);

        publicationRoutes.forEach((route) => {
          routes.push(route);
        });

        routes.push({
          name: `home-${language.toUpperCase()}`,
          path: encodeURI(`/${language}/`),
          file: `${__dirname}/pages/index.vue`,
        });
      }

      routes.push({
        name: "catch-all",
        path: "/:pathMatch(.*)*",
        file: `${__dirname}/pages/[slug].vue`,
      });
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
  ],
  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
    },
    defaultLocale: "de",
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
  css: ["./assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
