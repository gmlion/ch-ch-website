import { getIsoCodeFromLocale } from "@/utils/locale";
import { buildUrlFromPublication } from "@/utils/url";
import { getAllPublications } from "@/generate/store/publicationStore";
import { makeNavigationPath, getFooterMenus } from "@/utils/url";
import { makeSlug, electionSlugs } from "../utils/url";
import {useMenuStore} from "@/generate/store/menuStore";

/**
 * Extract a path from the menus
 *
 * Crawl through the menues and look for an entry that contains the publication
 * and return the menu path to that entry
 */
const deducePath = (publication, menus, isElection = false) => {
  let menuPath = [];
  let stopRecursion = false;

  // eslint-disable-next-line
  function crawlMenu(nodes, path) {
    if (stopRecursion) return;

    for (const entry of nodes) {
      if (entry.nodes && entry.nodes.length > 0) {
        crawlMenu(entry.nodes, path.concat([entry]));
      } else {
        // deliberately compare numbers with strings here
        // eslint-disable-next-line
        if (entry.documentId === publication.systemdata.documentId) {
          // we found an entry. let's use that
          stopRecursion = true;
          return (menuPath = path.concat([entry]));
        }
      }
    }
  }
  if (isElection) {
    menus = menus.sort((a, b) => {
      return b.label.localeCompare(a.label);
    });
  }
  for (const menu of menus) {
    crawlMenu(menu.nodes, []);
  }

  return menuPath;
};

/**
 *
 * Extract a path from the menus based on the current folder
 *
 * Crawl through the menues and look for an entry that has the same path as the current folder
 */
const deducePathDev = (menus, folder, isElection = false) => {
  let menuPath = [];
  let stopRecursion = false;

  // eslint-disable-next-line
  function crawlMenu(nodes, path) {
    if (stopRecursion) return;

    for (const entry of nodes) {
      if (entry.nodes && entry.nodes.length > 0) {
        crawlMenu(entry.nodes, path.concat([entry]));
      } else if (makeNavigationPath(path.concat([entry])) === folder) {
        menuPath = path.concat([entry]);
        stopRecursion = true;
      }
    }
  }
  if (isElection) {
    menus = menus.sort((a, b) => {
      return b.label.localeCompare(a.label);
    });
  }

  for (const menu of menus) {
    crawlMenu(menu.nodes, []);
  }

  return menuPath;
};

/**
 * Load the publication data from the API.
 * This is used when using the site in the dev mode.
 */
const loadPublicationData = async (context, menus, url) => {
  // Load all publications
  const allPublications = await getAllPublications();

  // Lets get the path without the language
  const pathSlug = url.substring(4);
  let documentId = 0;
  let stopRecursion = false;
  //const isElection = context.ssrContext.store.state.menu.isElection || false;
  // TODO: update this as soon as the store is set
  const isElection = false;

  function crawlMenu(nodes, path) {
    if (stopRecursion) return;

    for (const entry of nodes) {
      if (entry.nodes && entry.nodes.length > 0) {
        crawlMenu(entry.nodes, path.concat([entry]));
      }
      if (entry.nodes && entry.nodes.length > 0 &&
          makeNavigationPath(path.concat([entry])) ===
          decodeURIComponent(pathSlug)
      ) {
        documentId = parseInt(entry.documentId);
        stopRecursion = true;
      }
    }
  }

  // We want to find the document id by finding the path slug
  for (const menu of menus) {
    // Add whalen prefix based on language when splitting label.
    const slug = [];
    let language;
    if (isElection) {
      const labelSplit = menu.label.split("-");
      if (labelSplit.length === 2) {
        language = labelSplit[1];
      } else {
        language = labelSplit[2];
      }

      slug.push({ label: electionSlugs[language] });
    }
    crawlMenu(menu.nodes, slug);
  }
  if (documentId === 0) {
    for (const publication of allPublications) {
      if (!publication.metadata.title) {
        continue;
      }
      let publicationSlug = makeSlug(publication.metadata.title);
      if (isElection) {
        const language = publication.metadata.language.locale;
        publicationSlug = `${electionSlugs[language]}/${publicationSlug}`;
      }
      if (publicationSlug === pathSlug) {
        documentId = publication.systemdata.documentId;
        break;
      }
    }
  }

  // Find current publication by document id
  const currentPublication = allPublications.find((publication) => {
    if (!publication.metadata.title) return false;
    if (documentId === publication.systemdata.documentId) {
      return publication;
    }
  });

  return {
    currentPublication,
    allPublications,
  };
};

const getPublicationInOtherLanguages = (
  currentPublication,
  allPublications,
  menus,
  isElection
) => {
  // the publication has a language field, so let's get the other languages
  const language = currentPublication.metadata.language;
  const contentType = currentPublication.systemdata.contentType;

  // don't do this if there isn't a language info on the page or if the page is
  // an error page
  if (!language || contentType === "errorPage") return [];

  const locale = currentPublication.metadata.language.locale;
  const groupId = currentPublication.metadata.language.groupId;

  // Get the current document in the other languages (with the same group id and contentType)
  const publicationGroup = allPublications.filter((otherPublication) => {
    const otherMeta = otherPublication.metadata.language;
    if (!otherMeta) return false;
    return otherMeta.groupId === groupId && otherMeta.locale !== locale;
  });

  const publicationInOtherLanguages = publicationGroup.map((entry) => {
    const menuPath = deducePath(entry, menus, isElection);
    const route = buildUrlFromPublication(entry, menuPath, isElection);
    const locale = entry.metadata.language.locale;
    const isoCode = getIsoCodeFromLocale(locale);

    return {
      locale: isoCode,
      route,
    };
  });

  return publicationInOtherLanguages;
};

/**
 * Fetch the publication data from the API
 */
const loadDataFromAPI = async (context, url) => {
  const menus = await useMenuStore();
  const pubData = await loadPublicationData(context, menus, url);
  const path = decodeURIComponent(url.substring(4));
  // const isElection = context.ssrContext.store.state.menu.isElection;
  const isElection = false;
  const menuPath = deducePathDev(menus, path, isElection);
  return {
    currentPublication: pubData.currentPublication,
    allPublications: pubData.allPublications,
    menuPath,
    menus,
  };
};

const getPublicationData = async (context, url) => {
  const payload = context.payload;
  if (payload && payload.publication) {
    // payload contains our data
    return {
      currentPublication: payload.publication,
      allPublications: payload.publications,
      menuPath: payload.menuPath,
      menus: payload.menus,
    };
  } else {
    // we need to fetch the data
    return await loadDataFromAPI(context, url);
  }
};

export default async (context, url) => {
  const { currentPublication, allPublications, menuPath, menus } =
    await getPublicationData(context, url);
  if (!currentPublication) {
    return;
  }
  const language = currentPublication.metadata.language.locale;

  let publicationInOtherLanguages = [];

  if (currentPublication.systemdata.contentType !== "error") {
    // this doesn't make sense for error pages
    publicationInOtherLanguages = await getPublicationInOtherLanguages(
      currentPublication,
      allPublications,
      menus,
      false
    );
  }

  if (publicationInOtherLanguages) {
    //context.store.commit(
    //  "publications/setAvailableLanguages",
    //  publicationInOtherLanguages
    //);
  }

  if (allPublications) {
    let hasFaq = false;
    if (currentPublication.content[0].containers.right) {
      // Search in the content for a faq
      currentPublication.content[0].containers.right.forEach((content) => {
        if (content.content && content.content.faq) {
          hasFaq = true;
        }
        if (content.containers?.body) {
          content.containers.body.forEach((item) => {
            if (item.content && item.content.faq) {
              hasFaq = true;
            }
          });
        }
      });
    }

    if (hasFaq) {
      const faqs = allPublications.filter(
        (publication) => publication.systemdata.contentType === "faq"
      );
      //context.store.commit("publications/setFAQs", faqs);
    }

    const categories = allPublications.filter(
      (publication) => publication.systemdata.contentType === "category"
    );
    //context.store.commit("publications/setCategories", categories);
  }

  if (menus) {
    const footerMenus = getFooterMenus(menus, allPublications);
    //context.store.commit("menu/setFooterMenus", footerMenus);
  }

  let canonical = currentPublication.metadata.canonical;

  if (canonical && !canonical.endsWith("/")) {
    canonical += "/";
  }

  return {
    currentPublication,
    availableLanguages: publicationInOtherLanguages,
    menuPath,
    language,
    canonical,
  };
};