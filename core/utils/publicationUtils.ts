import type { Publication } from "../types/publications";

export const getPublicationUrlById = (id: number, publication: Publication) => {
  let publicationUrl = "";

  if (!publication) {
    console.log(`Publication with id ${id} not found`);
    publicationUrl = "";
  } else {
    publicationUrl = buildUrlFromPublication(publication);
  }

  return publicationUrl;
};
