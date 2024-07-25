import type { MenuNode } from "~/generate/types/routing";
import { getIsoCodeFromLocale } from "./locale";

export const electionSlugs: Record<string, string> = {
  de: "wahlen2023",
  it: "elezioni2023",
  fr: "elections2023",
  rm: "elecziuns2023",
  en: "elections2023",
};

const safeName = (name: string): string => {
  // Remove all CDM chars (https://en.wikipedia.org/wiki/Combining_Diacritical_Marks)
  name = name.normalize("NFD").replace(/[\u0300-\u036F]/g, "");

  return (
    name
      .toLowerCase()
      // replace spaces with dashes
      .replace(/\s/g, "-")
      // replace multiple dashes with one
      .replace(/(?:-)+/g, "-")
      // replace special characters with a dash
      .replace(/(,|'|‘|’|\(|\))+/g, "-")
      // Replace ? with nothing
      .replace(/\?/g, "")
      // Replace . with nothing
      .replace(/\./g, "")
      .replace(/"/g, "")
  );
};

export const makeNavigationPath = (path: { label: string }[]): string => {
  return path.map((entry) => safeName(entry.label)).join("/");
};

export const makeSlug = (title: string): string => {
  const slug = safeName(title);

  return slug;
};

// Find the menu url by documentid
export const findDocumentUrlById = (
  documentId: number,
  menu: { nodes: any[] },
  publications: any[]
): string => {
  const keyedPublications = makeKeyedPublications(publications);
  const documentPath = getDocumentPath(documentId, menu);
  return buildUrlFromPublication(keyedPublications[documentId], documentPath);
};

export const getDocumentPath = (
  documentId: number,
  menu: { nodes: any[] }
): any[] => {
  let documentPath: any[] = [];
  const crawlMenu = (nodes: any[], path: any[]): void => {
    for (const entry of nodes) {
      if (entry.nodes && entry.nodes.length > 0) {
        crawlMenu(entry.nodes, path.concat([entry]));
      } else if (documentId === parseInt(entry.documentId)) {
        documentPath = path.concat([entry]);
        break;
      }
    }
  };
  crawlMenu(menu.nodes, []);
  return documentPath;
};

export const buildUrlFromPublication = (
  publication: any,
  path: any[] = [],
  isElection: boolean = false
): string => {
  if (!publication) {
    return "";
  }

  const language = publication.metadata.language.locale;
  const isoCode = getIsoCodeFromLocale(language);

  const electionPath = isElection ? electionSlugs[isoCode] + "/" : "";

  if (!publication.metadata.title) {
    publication.metadata.title = "No-Title";
  }

  const slug = makeSlug(publication.metadata.title);
  if (path && path.length > 0) {
    const navigationPath = makeNavigationPath(path);

    return `/${isoCode}/${electionPath}${navigationPath}`;
  } else {
    return `/${isoCode}/${electionPath}${slug}`;
  }
};

export const buildUrlFromPath = (
  locale: string,
  path: { label: string }[],
  isElection: boolean
): string => {
  const pathSlug = makeNavigationPath(path);
  const electionPath = isElection ? electionSlugs[locale] + "/" : "";
  return `/${locale}/${electionPath}${pathSlug}`;
};

export const buildUrlFromTitle = (
  locale: string,
  title: string,
  isElection: boolean
): string => {
  const slug = makeSlug(title);
  const isoCode = getIsoCodeFromLocale(locale);
  const electionPath = isElection ? electionSlugs[locale] + "/" : "";
  return `/${isoCode}/${electionPath}${slug}`;
};

const makeKeyedPublications = (publications: any[]): Record<string, any> => {
  const pairs = publications.map((publication) => [
    publication.systemdata.documentId,
    publication,
  ]);
  return Object.fromEntries(pairs);
};

export const getFooterMenus = (
  menus: any[],
  allPublications: any[]
): any[] | null => {
  if (!menus) {
    return null;
  }
  const keyPublications = makeKeyedPublications(allPublications);

  const crawlMenu = (nodes: any[]): void => {
    for (const node of nodes) {
      if (node.nodes && node.nodes.length > 0) {
        crawlMenu(node.nodes);
      } else if (node.documentId) {
        node.document = keyPublications[node.documentId];
      }
    }
  };

  const footerMenus = menus.filter((menu) => {
    if (menu.handle && menu.handle.includes("footer")) return menu;
  });

  footerMenus.forEach((menu) => {
    crawlMenu(menu.nodes);
  });

  return footerMenus;
};

export const getBaseUrl = (): string | undefined => {
  const url = process.env.URL;

  // for some strange reason, in dev mode, we need to check if url
  // is truthy
  if (url && url.endsWith("/")) {
    return url;
  }

  return url ? url + "/" : undefined;
};

export const getUriFromNode = (node: MenuNode) => {
  if (node.type === "uri") return node.uri;
  return buildUrlFromPublication(node.document, [node]);
};
