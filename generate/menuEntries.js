import {
  added,
  getLastBuildContent,
  notBuilded,
  setLastBuildContent,
  updated,
} from "../crawlMenu";
import {
  usePublicationStore,
  makeKeyedPublications,
} from "../generate/store/publicationStore";
import {
  buildUrlFromPublication,
  electionSlugs,
  makeNavigationPath,
} from "../utils/url";
import makeFetch from "../utils/makeFetch";
import { useMenuStore } from "../generate/store/menuStore";

export default async () => {
  try {
    const generatePage = (publication, path, menu, isElection) => {
      const route = buildUrlFromPublication(publication, path, isElection);

      return {
        route,
        payload: { publication, publications, menuPath: path, menus, menu },
      };
    };

    const addPublicationToRoutes = (
      documentId,
      path,
      buildContent,
      menu,
      isElection
    ) => {
      const publication = keyedPublications[documentId];

      // TODO warn? error?
      if (!publication) return;

      const route = generatePage(publication, path, menu, isElection);
      const lastUpdate = new Date(publication.systemdata.updatedAt).getTime();

      // Ignore if the last document update is less or equals the date in the lastBuildContent
      if (
        buildContent[route.route] &&
        lastUpdate <= buildContent[route.route].date
      ) {
        process.env.GEN_DEBUG == true &&
          console.log("not build " + route.route);
        notBuilded.push(route.route);
        return;
      }
      process.env.GEN_DEBUG == true &&
        console.log(
          `build ${route.route} because of ${lastUpdate} > ${
            lastBuildContent[route.route]?.date || 0
          }`
        );
      if (!buildContent[route.route]) {
        added.push(route.route);
      } else {
        updated.push(route.route);
      }
      // push routes with url and payload
      routes.push(route);
    };

    // eslint-disable-next-line
    function crawlMenu(
      nodes,
      path,
      language,
      publications,
      buildContent,
      menu,
      isElection
    ) {
      for (const entry of nodes) {
        if (entry.nodes && entry.nodes.length > 0) {
          if (
            !buildContent[menu.label] ||
            menu.version !== buildContent[menu.label].version
          ) {
            const navigationPath = makeNavigationPath(path.concat([entry]));
            const electionPart = isElection
              ? electionSlugs[language] + "/"
              : "";

            routes.push({
              route: `/${language}/${electionPart}${navigationPath}`,
              payload: {
                path: path.concat([entry]),
                publications,
                menus,
                title: entry.label,
                menu,
              },
            });
          }
          crawlMenu(
            entry.nodes,
            path.concat([entry]),
            language,
            publications,
            buildContent,
            menu,
            isElection
          );
        } else {
          const documentId = entry.documentId;
          addPublicationToRoutes(
            documentId,
            path.concat([entry]),
            buildContent,
            menu,
            isElection
          );
        }
      }
    }

    const routes = [];

    const menus = await useMenuStore();

    // Get the latest publications
    let publications = await usePublicationStore();

    // Lets filter out the communes (they are not needed and just increase the size)
    publications = publications.filter(
      (publication) => publication.systemdata.contentType !== "commune"
    );

    const keyedPublications = makeKeyedPublications(publications);

    const lastBuildContent = getLastBuildContent();

    for (const menu of menus) {
      const [name, language] = menu.label.split("-");
      const isElection = name === "wahlen";

      // go through the languages and crawl them
      // don't call the crawlMenu on the top level menus entry, otherwise
      // the top level language entr (ch-de) would be in the path as well
      crawlMenu(
        menu.nodes,
        [],
        language,
        publications,
        lastBuildContent,
        menu,
        isElection
      );
      lastBuildContent[menu.label] = { version: menu.version };
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
