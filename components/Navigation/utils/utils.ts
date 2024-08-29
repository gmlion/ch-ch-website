import type { MinimizedPublicationType } from "~/core/types/publicationsTypes";
import type { MenuNode } from "~/generate/types/routing";

export const createRoute = (
  entry: MenuNode,
  publications: MinimizedPublicationType[],
  mode: string
) => {
  if (!publications || entry.nodes.length > 0) {
    return "";
  }

  if (entry.type === "uri") {
    return entry.uri;
  }

  const publication = publications.find(
    (publication) =>
      publication.systemdata.documentId === parseInt(entry.documentId!)
  );

  if (!publication) {
    return "";
  }

  let path = mode === "sub" ? [entry] : [entry];
  // TODO: chceck is election and replace the "false"
  let url = buildUrlFromPublication(publication, path, false);

  // if (process.env.NODE_ENV !== "development") {
  //   url += "/";
  // }

  return url;
};

export const createUrlTarget = (type: string, uri: string, target: string) => {
  if (type !== uri) {
    return "_self";
  }
  return target;
};