import {makeKeyedPublications, getAllPublications} from "./generate/store/publicationStore";
import {buildUrlFromPublication} from "./utils/url";
import type {PathType} from "./generate/types/routing";
import type {Publication} from "./core/types/publications";
import {useMenuStore} from "./generate/store/menuStore";
import type {NuxtPage} from "nuxt/schema";
type ElectionPathPrefixKey = "wahlen-de" | "wahlen-fr" | "wahlen-it" | "wahlen-rm" | "wahlen-en";
const routes: NuxtPage[] = [];

export default async () => {
    const publications = await getAllPublications();
    const menus = await useMenuStore();
    const keyedPublications = makeKeyedPublications(publications);
    const electionPathPrefixes = {
        "wahlen-de": "wahlen2023",
        "wahlen-fr": "elections2023",
        "wahlen-it": "elezioni2023",
        "wahlen-rm": "elecziuns2023",
        "wahlen-en": "elections2023",
    };

    const addPublicationToRoutes = (documentId: string, path: PathType[]): NuxtPage => {
            const publication = keyedPublications[documentId];
            const url = buildUrlFromPublication(publication, path);
            const route: NuxtPage = {
                name: `publication-${documentId}`,
                path: url,
                file: `${__dirname}/pages/publication.vue`,
            };
            return route
        }

        function crawlMenu(nodes: any, path: any[], language: string, publications: Publication[]) {
            for (const entry of nodes) {
                if (entry.nodes && entry.nodes.length > 0) {
                    crawlMenu(entry.nodes, path.concat([entry]), language, publications);
                } else if (languageMismatch(path, language)) {
                    console.log("language mismatch")
                    continue;
                } else {
                    console.log("adding publication to routes")
                    const documentId = entry.documentId;
                    const route = addPublicationToRoutes(documentId, path.concat([entry]))
                    routes.unshift(route);
                }
            }
        }



    function languageMismatch(path: PathType[], language: string) {
        const electionPathPrefix = electionPathPrefixes[`wahlen-${language}` as ElectionPathPrefixKey];
        return (
            Object.values(electionPathPrefixes).includes(path[0]?.label) &&
            path[0].label !== electionPathPrefix
        );
    }

    for (const menu of menus) {
        const language = menu.label.split("-")[1];
        const key = `wahlen-${menu.label}` as ElectionPathPrefixKey;
        const prefix = electionPathPrefixes[key] || undefined;
        const path = prefix ? [{ label: prefix }] : [];
        crawlMenu(menu.nodes, path, language, publications);
    }

    return routes;
}