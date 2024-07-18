import type {
  MenuNode,
  PathType,
  Menu,
  isElection,
} from "./generate/types/routing";
import type { NuxtPage } from "nuxt/schema";
import fs from "node:fs";
let lastBuildContent: Record<string, any> = {};
import { electionSlugs, getBaseUrl, makeNavigationPath } from "./utils/url";
//@ts-ignore
export const setLastBuildContent = (newLastBuildContent) =>
  (lastBuildContent = newLastBuildContent);

export const getLastBuildContent = () => {
  return lastBuildContent;
};

if (fs.existsSync(".dist_cache/build.json")) {
  lastBuildContent = JSON.parse(
    fs.readFileSync(".dist_cache/build.json", "utf-8")
  );
}

export const added: string[] = [];
export const removed: string[] = [];
export const updated: string[] = [];
export const notBuilded: string[] = [];
export const generatedRoutes: string[] = [];

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
      // Only add if the menu is not in the lastBuildContent or there is a new version
      if (
        !lastBuildContent[menu.label] ||
        menu.version !== lastBuildContent[menu.label].version ||
        process.env.NODE_ENV === "development"
      ) {
        // console.log(
        //   `build ${route} because of ${menu.version} !== ${
        //     lastBuildContent[menu.label]?.version || 0
        //   }`
        // );
        if (route) {
          const electionPart = isElection ? electionSlugs[language] + "/" : "";
          let pathString = "";
          if (isElection) {
            pathString = `/` + electionPart + route;
          } else {
            pathString = `/${language}/` + route;
          }

          if (!lastBuildContent[menu.label]) {
            added.push(pathString);
          } else {
            updated.push(pathString);
          }

          routes.unshift({
            name: route,
            path: encodeURI(pathString),
            file: `${__dirname}/pages/${electionPart}menuEntry.vue`,
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
      } else {
        notBuilded.push(`/${language}/${route}`);
      }
    }
  }
};

export default crawlMenu;