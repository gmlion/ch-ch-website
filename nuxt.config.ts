import { i18nLocales } from "./utils/locale";
import { useMenuStore } from "./generate/store/menuStore";
import getPublicationsRoutes from "./getPublicationsRoutes";
import crawlMenu from "./crawlMenu";
import { getHomeRoutes } from "./getHomeRoutes";

export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  site: {
    url: "https://ch.ch",
    name: "ch.ch",
    trailingSlash: false,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
      },
    },
  },

  routeRules: {
    "/**": { isr: true },
  },

  hooks: {
    "pages:extend": async (routes) => {
      const menus = await useMenuStore();
      const publicationRoutes = await getPublicationsRoutes(menus);
      const homeRoutes = await getHomeRoutes();
      let languages: string[] = [];
      for (const menu of menus) {
        const [name, language] = menu.label.split("-");
        if (!languages.includes(language)) {
          languages.push(language);
        }
        const isElection = name === "wahlen";
        crawlMenu(menu.nodes, [], language, menu, isElection, routes);
      }

      homeRoutes.forEach((route) => {
        routes.push(route);
      });

      publicationRoutes.forEach((route) => {
        routes.push(route);
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
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },

  devtools: {
    enabled: true,
    componentInspector: false,
    timeline: {
      enabled: true,
    },
  },

  runtimeConfig: {
    API_TOKEN: process.env.API_TOKEN,
    BASE_URL: process.env.BASE_URL,
    public: {
      electionYear: process.env.ELECTION_YEAR,
      searchUrl: process.env.API_URL_SEARCH,
    },
  },

  modules: [
    "@nuxtjs/svg-sprite",
    "@nuxtjs/i18n",
    "nuxt-swiper",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxtjs/tailwindcss",
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
    "vue3-carousel-nuxt",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
  ],

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  i18n: {
    strategy: "no_prefix",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
    },
    defaultLocale: "de",
    langDir: "lang/",
    locales: [{
      code: "de",
      name: "German",
      file: "de.json",
      cms: "de-CH",
    },
    {
      code: "fr",
      name: "French",
      file: "fr.json",
      cms: "fr-CH",
    },
    {
      code: "it",
      name: "Italian",
      file: "it.json",
      cms: "it-CH",
    },
    {
      code: "rm",
      name: "Romansh",
      file: "rm.json",
      cms: "rm-CH",
    },
    {
      code: "en",
      name: "English",
      file: "en.json",
      cms: "en",
    }],
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

  css: ["./assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-08-30",
});
