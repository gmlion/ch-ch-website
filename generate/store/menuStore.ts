import { atom } from "nanostores";
import { type MenuNode, type MenuResponse } from "../types/routing";
import makeFetch from "../../utils/makeFetch";
import { type IndexMenu, type MenuItem } from "../types/menu";
import { setIndexPublication, useUsedPublications } from "./publicationStore";
import { createRoute } from "../../components/Navigation/utils/utils";
import type { MinimizedPublicationType } from "~/core/types/publications";

export const menuStore = atom<MenuResponse[]>([]);
export const currentPaths = atom<MenuItem[]>([]);
export const indexMenuStore = atom<MenuResponse | null>(null);
export const menuPush = atom<MenuResponse | null>(null);
export const homeMenuItems = atom<MenuItem[] | null>(null);

export const useMenuStore = async () => {
  if (menuStore.get().length === 0) {
    console.log("no menu store, fetching");
    const response = await makeFetch().request("/menus");
    const menus = await response.json();
    menuStore.set(menus);
  } else {
    console.log("menu store already exists");
  }

  return menuStore.get();
};

export const setIndexMenuForLanguages = async (
  locale: string
): Promise<MenuResponse | null> => {
  console.log("indexMenuStore does not exist, setup...");
  const menus = await useMenuStore();
  let menuForLanguage: MenuResponse | null = null;

  menus.forEach((menu) => {
    // Our naming is chch-${LANGUAGE_CODE}
    if (menu.label === "chch-" + locale) {
      menuForLanguage = menu;
    }
  });

  if (!menuForLanguage) {
    menuForLanguage = menus[0];
  }

  menuForLanguage.nodes = menuForLanguage.nodes.map((node) => {
    node.isExpanded = false;
    return node;
  });

  return menuForLanguage;
};

export const setPaths = (
  navigationEntry: MenuItem,
  isFirstLevel: boolean = false
) => {
  const currentPathsStore = currentPaths.get();

  const index = currentPathsStore.findIndex(
    (entry) => entry.id === navigationEntry.id
  );

  if (isFirstLevel) {
    currentPaths.set([]);
    currentPaths.set([navigationEntry]);
    return;
  }

  if (index !== -1) {
    currentPaths.set(currentPathsStore.slice(0, index + 1));
  } else {
    currentPaths.set([navigationEntry].concat(currentPathsStore));
  }
};

export const removeFirstLevelItem = () => {
  const currentPathsStore = currentPaths.get();

  currentPaths.set(currentPathsStore.slice(1));
};

export const useIndexMenu = async (locale: string): Promise<IndexMenu> => {
  const menu = await setIndexMenuForLanguages(locale);
  const homePublication = await setIndexPublication(locale);

  return {
    menu: menu,
    homePublication: homePublication,
    lang: locale,
  };
};

export const getHomeMenuItems = async (locale: string) => {
  const navLinkItems: MenuItem[] = [];
  const menuData = await useIndexMenu(locale);
  if (menuData?.menu) {
    const usedPublications = await useUsedPublications(menuData.menu);
    menuData?.menu.nodes.forEach((entry) => {
      let item: MenuItem = createMenuItems(entry, usedPublications);

      return navLinkItems.push(item);
    });
  }

  return navLinkItems;
};

const createMenuItems = (
  entry: MenuNode,
  usedPublications: MinimizedPublicationType[],
  parentId: string = ""
) => {
  let item: MenuItem = {
    id: entry.id,
    label: entry.label,
    type: entry.type,
    target: entry.target,
    parentId: parentId,
    children: entry.nodes
      ? entry.nodes.map((child) =>
          createMenuItems(child, usedPublications, entry.id)
        )
      : [],
    route: createRoute(entry, usedPublications, "main"),
  };

  return item;
};
