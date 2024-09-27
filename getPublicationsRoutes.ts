import { buildUrlFromPublication } from "./utils/url";
import type { MenuNode, MenuResponse } from "./generate/types/routingTypes";
import type { NuxtPage } from "nuxt/schema";
import { getKeyedPublications } from "./generate/store/publicationStore";

type ElectionPathPrefixKey =
  | "wahlen-de"
  | "wahlen-fr"
  | "wahlen-it"
  | "wahlen-rm"
  | "wahlen-en";
const routes: NuxtPage[] = [];

export default async (menus: MenuResponse[]) => {
  const keyedPublications = await getKeyedPublications();
  const electionPathPrefixes = {
    "wahlen-de": "wahlen2023",
    "wahlen-fr": "elections2023",
    "wahlen-it": "elezioni2023",
    "wahlen-rm": "elecziuns2023",
    "wahlen-en": "elections2023",
  };

  const addPublicationToRoutes = (
    documentId: string,
    path: MenuNode[],

    isElection?: boolean
  ): NuxtPage | null => {
    if (!keyedPublications) return null;
    const publication = keyedPublications[documentId];
    const url = buildUrlFromPublication(publication, path);

    if (publication === undefined) return null;
    const route: NuxtPage = {
      name: publication?.metadata?.title || "",
      path: url,
      file: `${__dirname}/pages/publication.vue`,

      meta: {
        id: documentId,
        isElection: isElection,
        contentType: publication?.systemdata?.contentType || "",

        groupId: {
          id: (publication?.metadata?.language?.groupId as string) || "",
          language: publication?.metadata?.language?.locale,
        },
      },
    };
    return route;
  };

  function crawlMenu(
    nodes: MenuNode[],
    path: any,
    language: string,
    isElection: boolean
  ) {
    const stack = [{ nodes, path }];

    while (stack.length > 0) {
      const { nodes, path } = stack.pop()!;

      for (const entry of nodes) {
        if (entry.nodes && entry.nodes.length > 0) {
          stack.push({ nodes: entry.nodes, path: path.concat([entry]) });
        } else {
          const documentId = entry.documentId;
          const route = addPublicationToRoutes(
            documentId as string,
            path.concat([entry]),
            isElection
          );
          if (route) {
            routes.unshift(route);
          }
        }
      }
    }
  }

  for (const menu of menus) {
    const language = menu.label.split("-")[1];
    const key = menu.label.includes("wahlen")
      ? menu.label
      : ("" as ElectionPathPrefixKey | string);

    //@ts-ignore
    const prefix = key ? electionPathPrefixes[key] : undefined;
    const isElection = !!prefix;
    const path = prefix
      ? [{ label: prefix, id: "", nodes: [], type: "", document: null }]
      : [];

    crawlMenu(menu.nodes, path, language, isElection);
  }

  return routes;
};
