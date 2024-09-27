import type {isElection, Menu, MenuNode, PathType,} from "./generate/types/routingTypes";
import type {NuxtPage} from "nuxt/schema";
import {electionSlugs, makeNavigationPath} from "./utils/url";


const crawlMenu = (
    nodes: MenuNode[],
    path: PathType[],
    language: string,
    menu: Menu,
    isElection: isElection,
    routes: NuxtPage[]
) => {
    for (const entry of nodes) {
        if (entry.nodes && entry.nodes.length > 0) {
            const route = makeNavigationPath(path.concat([entry]));
            if (route) {
                const electionPart = isElection ? electionSlugs[language] + "/" : "";
                let pathString = "";
                if (isElection) {
                    pathString = `/${language}/` + electionPart + route;
                } else {
                    pathString = `/${language}/` + route;
                }
                routes.unshift({
                    name: entry.label,
                    path: encodeURI(pathString),
                    meta: {
                        id: entry.id,
                        isElection: isElection,
                    },
                    file: `${__dirname}/pages/menuEntry.vue`,
                });
            }

            crawlMenu(
                entry.nodes,
                path.concat([entry]),
                language,
                menu,
                isElection,
                routes
            );
        }
    }
};

export default crawlMenu;