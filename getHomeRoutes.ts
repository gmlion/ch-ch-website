import { getHomePages } from "./generate/store/publicationStore";
import { transformPublicationsToHomeRoutes } from "./utils/homePublicationsTransform";

export const getHomeRoutes = async () => {
  const homePublications = await getHomePages();

  return transformPublicationsToHomeRoutes(homePublications);
};
