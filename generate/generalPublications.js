import {
  added,
  getLastBuildContent,
  notBuilded,
  setLastBuildContent,
  updated,
} from "../nuxt.config.js";
import { getIsoCodeFromLocale } from "../utils/locale";
import { getAllPublications } from "../utils/publication";
import { resolveTags } from "../utils/tags";
import { buildUrlFromPublication } from "../utils/url.js";
import makeFetch from "../utils/makeFetch.js";

const generateRegularPage = async (publication, publications, menus) => {
  const axios = makeFetch();
  let isElection = false;

  if (publication && "tag-category" in publication.metadata) {
    const tags = await resolveTags(axios, publication.metadata["tag-category"]);
    if (tags.length !== 0 || tags.includes("wahlen")) {
      isElection = true;
    }
  }
  const route = buildUrlFromPublication(publication, [], isElection);

  return {
    route,
    payload: {
      publication,
      publications,
      menuPath: [{ label: publication.metadata.title }],
      menus,
    },
  };
};

const generateErrorPage = (publication, publications, menus) => {
  return new Promise((resolve) => {
    const language = publication.metadata.language.locale;
    const isoCode = getIsoCodeFromLocale(language);
    const errorCode = publication.metadata.errorCode;

    const route = `/${isoCode}/${errorCode}`;
    const payload = { publication, publications };

    resolve({
      route,
      payload,
    });
  });
};

const contentTypes = {
  regular: generateRegularPage,
  error: generateErrorPage,
  about: generateRegularPage,
  page: generateRegularPage,
};

export const flattenMenu = (menus) => {
  const documents = [];

  function crawlMenu(menu) {
    for (const entry of menu) {
      if (entry.nodes && entry.nodes.length > 0) {
        crawlMenu(entry.nodes);
      } else {
        documents.push(entry.documentId);
      }
    }
  }

  crawlMenu(menus);
  // make 'em unique
  return Array.from(new Set(documents)).map((a) => parseInt(a));
};

export default async () => {
  try {
    const routes = [];
    const axios = makeFetch();

    // Get the latest publications
    let publications = await getAllPublications(axios.get);
    const menus = (await axios.get("/menus")).data;

    const documentsInMenu = flattenMenu(menus);

    // Lets filter out the communes (they are not needed and just increase the size)
    publications = publications.filter(
      (publication) => publication.systemdata.contentType !== "commune"
    );

    const lastBuildContent = getLastBuildContent();

    for (const publication of publications) {
      const documentId = publication.systemdata.documentId;

      // skip those that are referred in the menu, as they're being generated
      // elsewhere
      if (documentsInMenu.includes(parseInt(documentId))) {
        continue;
      }

      const contentType = publication.systemdata.contentType;

      if (!(contentType in contentTypes)) {
        continue;
      }

      const route = await contentTypes[contentType](
        publication,
        publications,
        menus
      );

      const lastUpdate = new Date(publication.systemdata.updatedAt).getTime();

      // Ignore if the last document update is less or equals the date in the lastBuildContent
      if (
        lastBuildContent[route.route] &&
        lastUpdate <= lastBuildContent[route.route].date
      ) {
        // process.env.GEN_DEBUG == true &&
        console.log("not build " + route);
        notBuilded.push(route.route);
        continue;
      }
      // process.env.GEN_DEBUG == true &&

      console.log(
        `build ${route} because of ${lastUpdate} > ${
          lastBuildContent[route.route]?.date || 0
        }`
      );
      if (!lastBuildContent[route.route]) {
        added.push(route.route);
      } else {
        updated.push(route.route);
      }

      // push routes with url and payload
      routes.push(route);
    }

    routes.forEach((route) => {
      if (route.payload.publication) {
        lastBuildContent[route.route] = { date: new Date().getTime() };
      }
    });

    setLastBuildContent(lastBuildContent);

    return routes;
  } catch (exception) {
    console.error(exception);
  }

  return [];
};
