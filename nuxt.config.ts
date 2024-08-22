import fs from "node:fs";
import { i18nLocales } from "./utils/locale";
import { useMenuStore } from "./generate/store/menuStore";
import getPublicationsRoutes from "./getPublicationsRoutes";
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

    routeRules: {
        "/**": { isr: true },
    },

    hooks: {
        "pages:extend": async (routes) => {
            const menus = await useMenuStore();
            const publicationRoutes = await getPublicationsRoutes(menus);
            let languages: string[] = [];
            for (const menu of menus) {
                const [name, language] = menu.label.split("-");
                if (!languages.includes(language)) {
                    languages.push(language);
                }
                const isElection = name === "wahlen";
                crawlMenu(menu.nodes, [], language, menu, isElection, routes);

                publicationRoutes.forEach((route) => {
                    routes.push(route);
                });
            }
            languages.forEach((language) => {
                routes.push({
                    name: `home-${language.toUpperCase()}`,
                    path: encodeURI(`/${language}/`),
                    file: `${__dirname}/pages/index.vue`,
                });
            });

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

    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },

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
        "nuxt-swiper",
        "@nuxtjs/robots",
        "@nuxtjs/sitemap",
        [
            "nuxt-headlessui",
            {
                prefix: "Headless",
            },
        ],
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

    css: ["./assets/scss/main.scss"],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    compatibilityDate: "2024-08-09",
});
