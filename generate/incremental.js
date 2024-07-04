import {
  added,
  generatedRoutes,
  getLastBuildContent,
  notBuilded,
  removed,
  updated,
} from "../nuxt.config.js";
import { makeNavigationPath } from "../utils/url.js";
import makeFetch from "../utils/makeFetch.js";
import fs from "fs-extra";

/**
 * Remove files/folders
 *
 * Remove files/folders recursively if recursive is true. Keep non-empty
 * folders based on checkEmpty parameter.
 */
const cleanUp = (path, recursive = false, checkEmpty = false) => {
  // checks if path exists
  if (!fs.existsSync(path)) {
    return;
  }

  // if the path is a folder
  if (fs.lstatSync(path).isDirectory()) {
    // if we should check if the folder is empty
    if (checkEmpty) {
      if (fs.readdirSync(path).length !== 0) {
        // there's something there, don't delete
        return;
      }
    }

    fs.rmSync(path, { recursive });
    return;
  }

  fs.rmSync(path);
};

// cleaning up removed assets
const cleanUpRemoved = () => {
  removed.forEach((removedRoute) => {
    const folders = removedRoute.split("/");
    cleanUp(`dist${removedRoute}/index.html`);

    // Cleanup empty folders
    for (let i = folders.length - 1; i > 0; i--) {
      const path = folders.slice(0, i + 1).join("/");
      cleanUp(`dist/${path}`, false, true);
    }
  });
};

const cleanUpStaticFiles = () => {
  if (!fs.existsSync(".dist_cache/_nuxt/static")) {
    return;
  }

  // Lets sort it by subfolder length
  const generatedRoutesSorted = generatedRoutes.sort(
    (a, b) => b.split("/").length - a.split("/").length
  );

  // better handled as a one off event
  let staticFolders = fs.readdirSync(".dist_cache/_nuxt/static");
  staticFolders = staticFolders.slice(0, staticFolders.length - 1);

  staticFolders.forEach((folder) => {
    const path = ".dist_cache/_nuxt/static/" + folder;

    generatedRoutesSorted.forEach((generatedRoute) => {
      const pathGenerated = path + generatedRoute;
      cleanUp(pathGenerated + "/payload.js");
      cleanUp(pathGenerated + "/state.js");
      cleanUp(pathGenerated, false, true);
    });

    // foreach is blocking so we can decrease the space
    // complexity by just reverting the walk over the objects
    if (fs.readdirSync(path).length === 1) {
      cleanUp(path + "/manifest.js");
      cleanUp(path, true, true);
    }
  });
};

export default async () => {
  const lastBuildContent = getLastBuildContent();
  // Check if routes got removed (if they are ignored, not added,
  // not updated and they are a detail page)
  Object.keys(lastBuildContent).forEach((route) => {
    if (
      !notBuilded.includes(route) &&
      !added.includes(route) &&
      !updated.includes(route) &&
      !lastBuildContent[route].version
    ) {
      removed.push(route);
      delete lastBuildContent[route];
    }
  });

  // will use the lastBuildContent in order to push the files directly to the website
  // will use the removed in order to remove the files directly in the pvc for the website

  console.log("Copying files...");
  // Check if the cache exists
  const cacheExists = fs.existsSync(".dist_cache");

  // On cached builds remove all webpack builded assets afterwards to prevent overriding these files
  /* if (!process.env.NO_INCREMENTAL_BUILD) {
    const files = fs.readdirSync('dist/_nuxt')
    files.forEach((file) => {
      if (file !== 'static' && file !== 'img') {
        fs.rmSync('dist/_nuxt/' + file)
      }
    })
  } */

  // Copy dist to dist_cache and back to merge both folders
  fs.copySync("dist", ".dist_cache");
  console.log("done copying dist to cache");

  cleanUp("dist", true);

  const axios = makeFetch();

  const menus = (await axios.get("/menus")).data;

  function crawlMenu(nodes, path, language, menu) {
    for (const entry of nodes) {
      if (entry.nodes && entry.nodes.length > 0) {
        const navigationPath = makeNavigationPath(path.concat([entry]));
        menuRoutes.push(`/${language}/${navigationPath}`);
        crawlMenu(entry.nodes, path.concat([entry]), language, menu);
      }
    }
  }

  const menuRoutes = [];

  for (const menu of menus) {
    const language = menu.label.split("-")[1];
    // go through the languages and crawl them
    // don't call the crawlMenu on the top level menus entry, otherwise
    // the top level language entr (ch-de) would be in the path as well
    crawlMenu(menu.nodes, [], language, menu);
  }

  const routes = new Set([
    ...notBuilded,
    ...generatedRoutes,
    ...added,
    ...updated,
    ...menuRoutes,
  ]);

  const manifestContent = `__NUXT_JSONP__("manifest.js", {routes:${JSON.stringify(
    Array.from(routes).map((route) => encodeURI(route))
  )}})`;

  fs.writeFileSync(
    ".dist_cache/_nuxt/static/assets/manifest.js",
    manifestContent
  );

  console.log("done deleting dist");

  // If there are removed routes we need to clean up the folder
  if (fs.existsSync(".dist_cache") && removed.length > 0) {
    cleanUpRemoved();
    console.log("cleaned removed");
  }

  // We need to remove static files if files are fresh generated
  if (generatedRoutes.length > 0 && cacheExists) {
    // cleanUpStaticFiles()
    console.log("cleaned static files");
  }

  // Remove build.json if inside dist folder
  cleanUp("dist/build.json");
  cleanUp("dist/deleted.json");
  // Update build.json for the new build
  fs.writeFileSync(".dist_cache/build.json", JSON.stringify(lastBuildContent));
  // Update deleted.json for swisscom
  fs.writeFileSync(".dist_cache/deleted.json", JSON.stringify(removed));

  await axios.post("/kill");
};
