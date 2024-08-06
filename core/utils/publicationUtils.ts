import type { Publication } from "../types/publications";

export const getPublicationUrlById = (
  id: number,
  publications: Publication[]
) => {
  let publicationUrl = "";
  const publication = publications.find(
    (publication) => publication.systemdata.documentId === id
  );
  if (!publication) {
    console.log(`Publication with id ${id} not found`);
    publicationUrl = "";
  } else {
    publicationUrl = buildUrlFromPublication(publication);
  }

  return publicationUrl;
};
