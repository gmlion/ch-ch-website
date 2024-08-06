import { getPublicationById } from "@/utils/publication";
import { v4 as uuidv4 } from "uuid";
import { getIsoCodeFromLocale } from "./locale";
import { buildUrlFromPublication, getDocumentPath, getBaseUrl } from "./url";

const documentLinkRegex = new RegExp("<a[^>]+>.+?</a>", "gm");
const documentIdRegex = new RegExp('data-li-document-ref="([^"]+)"', "m");

const getUrlFromMenu = (publication, menus, isElection) => {
  const language = publication.metadata.language.locale;
  const isoCode = getIsoCodeFromLocale(language);

  const chchLanguageMenu = menus.find(
    (menu) => menu.label === `chch-${isoCode}`
  );
  const electionLanguageMenu = menus.find(
    (menu) => menu.label === `wahlen-${isoCode}`
  );

  /**
   * Little wrapper around the getDocumentPath helper
   */
  const _getDocumentPath = (languageMenu) => {
    if (!languageMenu) {
      return null;
    }

    return getDocumentPath(publication.systemdata.documentId, languageMenu);
  };

  /**
   * Get the path of the document
   * If we're in election mode, look in the election menu first! Otherwise,
   * we prioritize the chch menu
   */
  const getPath = () => {
    if (isElection) {
      const electionEntry = _getDocumentPath(electionLanguageMenu);

      if (electionEntry) {
        return [electionEntry, true];
      }

      // nothing in election found, look in normal menu
      return [_getDocumentPath(chchLanguageMenu), false];
    } else {
      const chchEntry = _getDocumentPath(chchLanguageMenu);
      if (chchEntry) {
        return [chchEntry, false];
      }

      // nothing in chch found, look in election menu
      return [_getDocumentPath(electionLanguageMenu), true];
    }
  };

  const [documentPath, linkToElection] = getPath();

  // Remove the first slash by substring
  return buildUrlFromPublication(
    publication,
    documentPath,
    linkToElection
  ).substring(1);
};

const replaceCantonalServiceLink = (linkText, fullText, publication) => {
  let text = fullText;
  const cantonPickerId = uuidv4();
  const cantonPicker = {
    cantonPickerId,
    publication,
  };
  const linkWithCantonPickerId = linkText.replace(
    />/,
    ` canton-picker-id="${cantonPickerId}">`
  );
  text = text.replace(linkText, linkWithCantonPickerId);
  linkText = linkWithCantonPickerId;
  // Replace the href with nothing because the link is just opening the cantonpicker
  const withoutHref = linkText.replace(/href="(.[^"]+)"/, "");

  text = text.replace(linkText, withoutHref);

  return { text, cantonPicker };
};

// Replaces internal links with the document url
export const replaceInternalLinks = async (text, get, isElection) => {
  const matches = documentLinkRegex.test(text);
  documentLinkRegex.lastIndex = 0;

  if (!matches) {
    return { replacedText: text, cantonPickers: [] };
  }

  const menus = (await get("/menus")).data;
  const cantonPickers = [];
  const linkMatches = text.match(documentLinkRegex);

  for (let i = 0; i < linkMatches.length; i++) {
    const linkText = linkMatches[i];

    const refIdMatches = documentIdRegex.exec(linkText);
    documentIdRegex.lastIndex = 0;
    // The second match is the documentid
    if (refIdMatches && refIdMatches[1]) {
      const documentId = refIdMatches[1];

      let publication;
      let replacedHref;

      try {
        // linked document cannot be found
        publication = await getPublicationById(documentId, get);

        if (!publication) {
          continue;
        }

        if (publication.systemdata.contentType === "cantonal-service") {
          const { text: replacedText, cantonPicker } =
            replaceCantonalServiceLink(linkText, text, publication);
          text = replacedText;
          cantonPickers.push(cantonPicker);
          continue;
        }

        let replaceUrl = "";

        const url = getUrlFromMenu(publication, menus, isElection);
        if (!url) {
          continue;
        }
        const baseUrl = getBaseUrl();

        replaceUrl = `${baseUrl}${url}`;

        // Replace the href
        replacedHref = linkText.replace(
          /href="(.[^"]+)"/,
          `href="${replaceUrl}"`
        );
        text = text.replace(linkText, replacedHref);
      } catch (error) {
        // error occured. Fallback to #
        replacedHref = linkText.replace(/href=".*?"/, 'href="#"');
      }

      // Replace the whole a element
      text = text.replace(linkText, replacedHref);
    }
  }

  documentLinkRegex.lastIndex = 0;
  documentIdRegex.lastIndex = 0;
  return { replacedText: text, cantonPickers };
};

export const replaceEmptyLinks = (text) => {
  const replaced = text.replace(/<a [^<]*?><\/a>/gm, "");
  return replaced;
};

export const cleanUpText = (text) => {
  return text
    .replace(/<br>/g, "")
    .replace(/<\/br>/g, "")
    .replace(/<sup>/g, "")
    .replace(/<\/sup>/g, "")
    .replace(/&nbsp;/g, "")
    .replace(/<strong>/g, "")
    .replace(/<\/strong>/g, "");
};
