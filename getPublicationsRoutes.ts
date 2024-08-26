import {buildUrlFromPublication} from "./utils/url";
import type {MenuNode, MenuResponse, PathType} from "./generate/types/routing";
import type {NuxtPage} from "nuxt/schema";
import {makeKeyedPublications} from "./generate/store/publicationStore";

type ElectionPathPrefixKey =
    | "wahlen-de"
    | "wahlen-fr"
    | "wahlen-it"
    | "wahlen-rm"
    | "wahlen-en";
const routes: NuxtPage[] = [];

export default async (menus: MenuResponse[]) => {
    const keyedPublications = await makeKeyedPublications();
    const electionPathPrefixes = {
        "wahlen-de": "wahlen2023",
        "wahlen-fr": "elections2023",
        "wahlen-it": "elezioni2023",
        "wahlen-rm": "elecziuns2023",
        "wahlen-en": "elections2023",
    };

    const addPublicationToRoutes = (
        documentId: string,
        path: MenuNode[]
    ): NuxtPage | null => {
        if (!keyedPublications) return null;
        const publication = keyedPublications[documentId];
        if (!publication || !path) return null;
        const url = buildUrlFromPublication(publication, path);
        if (!url) return null;
        const route: NuxtPage = {
            name: publication.metadata.title,
            path: url,
            file: `${__dirname}/pages/publication.vue`,
            meta: {id: documentId},
        };
        return route;
    };

    function crawlMenu(nodes: MenuNode[], path: any, language: string) {
        const stack = [{ nodes, path }];

        while (stack.length > 0) {
            const { nodes, path } = stack.pop()!;

            for (const entry of nodes) {
                if (entry.nodes && entry.nodes.length > 0) {
                    stack.push({ nodes: entry.nodes, path: path.concat([entry]) });
                } else if (!languageMismatch(path, language)) {
                    const documentId = entry.documentId;
                    const route = addPublicationToRoutes(documentId as string, path.concat([entry]));
                    if (route) {
                        routes.unshift(route);
                    }
                }
            }
        }
    }

    function languageMismatch(path: PathType[], language: string) {
        const electionPathPrefix =
            electionPathPrefixes[`wahlen-${language}` as ElectionPathPrefixKey];
        return (
            Object.values(electionPathPrefixes).includes(path[0]?.label) &&
            path[0].label !== electionPathPrefix
        );
    }

    for (const menu of menus) {
        // Ensure menu.label is valid and has the expected format
        if (!menu.label || !menu.label.includes("-")) {
            console.warn(`Unexpected menu label format: ${menu.label}`);
            continue;
        }

        const language = menu.label.split("-")[1];

        // Validate language to ensure it's correct
        if (!electionPathPrefixes[`wahlen-${language}` as ElectionPathPrefixKey]) {
            console.warn(`Unexpected language detected: ${language}`);
            continue;
        }

        const key = `wahlen-${menu.label}` as ElectionPathPrefixKey;
        const prefix = electionPathPrefixes[key];

        // TODO: here seems to be a memory leak, checking if the language is in the array makes it go away but some routes are missing then

        const path = prefix ? [{ label: prefix, id: '', nodes: [], type: '', document: null }] : [];        // Ensure menu.nodes is valid before calling crawlMenu
        if (Array.isArray(menu.nodes)) {
            crawlMenu(menu.nodes, path, language);
        } else {
            console.warn(`Invalid nodes structure in menu: ${menu.label}`);
        }
    }

    return routes;
};