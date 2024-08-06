import type { Publication } from "~/core/types/publications";
import { getPublicationUrlById } from "~/core/utils/publicationUtils";

export const replaceLivingDocsIdsWithUrls = (
  html: string,
  publications: Publication[]
) => {
  const regex = /data-li-document-ref="(\d+)"/g;
  const matches = html.matchAll(regex);
  let replacedHTML = html;

  for (const match of matches) {
    const id = match[1]; // Capture group containing the ID
    if (id) {
      const url = getPublicationUrlById(parseInt(id), publications);
      const hrefRegex = new RegExp(`href="[^"]*"`); // Matches the current href attribute
      replacedHTML = replacedHTML.replace(hrefRegex, `href="${url}"`);
    }
  }

  return replacedHTML;
};
