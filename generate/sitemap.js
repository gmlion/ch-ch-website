import { getIsoCodeFromLocale } from "../utils/locale";
import {
  getAllPublications,
  makeKeyedPublications,
} from "../utils/publication";
import { buildUrlFromPublication, getBaseUrl } from "../utils/url";
import { makeFetch } from "../utils/makeFetch";
import { flattenMenu } from "./generalPublications";

const languages = ["de", "fr", "it", "en", "rm"];


export default async () => {
  const axios = makeFetch();

  const publications = await getAllPublications(axios.get);
  const keyedPublications = makeKeyedPublications(publications);
  const menus = (await axios.get("/menus")).data;

  const sitemaps = {};

  const electionPathPrefixes = {
    "wahlen-de": "wahlen2023",
    "wahlen-fr": "elections2023",
    "wahlen-it": "elezioni2023",
    "wahlen-rm": "elecziuns2023",
    "wahlen-en": "elections2023",
  };

  languages.forEach((language) => {
    // Add default sitemap
    if (!sitemaps[language]) {
      sitemaps[language] = {
        routes: [],
        path: `/sitemap-${language}.xml`,
        trailingSlash: true,
        exclude: [
          "/*/search",
          "/menuEntry",
          // Exclude homepages
          ...languages.map((language) => `/${language}`),
        ],
        // Filter out all predefined routes
        filter({ routes }) {
          return routes.filter((route) => route.component === undefined);
        },
        // False means that we are adding the hostname in the route
        hostname: false,
      };
    }
  });

  for (const publication of publications) {
    if (!publication.systemdata) {
      continue;
    }
    const contentType = publication.systemdata.contentType;
    if (contentType === "homepage") {
      const language = publication?.metadata?.language?.locale;
      const url = `/${language}`;
      const isoCode = getIsoCodeFromLocale(language);
      addRouteToSitemap(url, isoCode, publication);
    }
  }

  const addPublicationToRoutes = (documentId, path) => {
    const publication = keyedPublications[documentId];
    const url = buildUrlFromPublication(publication, path);
    const language = publication?.metadata?.language?.locale;
    const isoCode = getIsoCodeFromLocale(language);

    if (shouldAddUrltoSitemap(url, isoCode, publication))
      addRouteToSitemap(url, isoCode, publication);
  };

  function crawlMenu(nodes, path, language, publications) {
    for (const entry of nodes) {
      if (entry.nodes && entry.nodes.length > 0) {
        crawlMenu(entry.nodes, path.concat([entry]), language, publications);
      } else if (languageMismatch(path, language)) {
        continue;
      } else {
        const documentId = entry.documentId;
        addPublicationToRoutes(documentId, path.concat([entry]));
      }
    }
  }

  for (const menu of menus) {
    const language = menu.label.split("-")[1];
    const prefix = electionPathPrefixes[menu.label] || undefined;
    const path = prefix ? [{ label: prefix }] : [];

    // go through the languages and crawl them
    // don't call the crawlMenu on the top level menus entry, otherwise
    // the top level language entry (ch-de) would be in the path as well
    crawlMenu(menu.nodes, path, language, publications);
  }

  const documentsInMenu = flattenMenu(menus);

  for (const publication of publications) {
    const documentId = publication.systemdata.documentId;
    if (documentsInMenu.includes(parseInt(documentId))) {
      continue;
    }
    const contentType = publication.systemdata.contentType;
    if (contentType !== "regular") {
      continue;
    }
    addPublicationToRoutes(documentId, null);
  }

  return {
    // False means that we are adding the hostname in the route
    hostname: getBaseUrl(),
    sitemaps: Object.values(sitemaps),
    path: "sitemap.xml",
  };

  function addRouteToSitemap(url, isoCode, publication) {
    sitemaps[isoCode].routes.push({
      url,
      changefreq: "weekly",
      lastmod: publication.systemdata.updatedAt,
      priority: 0.5,
    });
  }

  function urlEqualsCanonical(url, canonical) {
    return (
      !canonical || canonical?.endsWith(url) || canonical?.endsWith(`${url}/`)
    );
  }

  function urlIsAlreadyInSitemap(url, isoCode) {
    return sitemaps[isoCode].routes.some((route) => route.url === url);
  }

  function shouldAddUrltoSitemap(url, isoCode, publication) {
    const seoRobots = publication?.metadata?.seoRobots;
    const canonical = publication?.metadata?.canonical;

    return (
      publication?.metadata?.language &&
      seoRobots !== "noindex" &&
      seoRobots !== "none" &&
      urlEqualsCanonical(url, canonical) &&
      !urlIsAlreadyInSitemap(url, isoCode)
    );
  }

  function languageMismatch(path, language) {
    const electionPathPrefix = electionPathPrefixes[`wahlen-${language}`];
    return (
      Object.values(electionPathPrefixes).includes(path[0]?.label) &&
      path[0].label !== electionPathPrefix
    );
  }
};