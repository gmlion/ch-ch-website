import { atom } from "nanostores";
import { type MenuNode, type MenuResponse } from "../types/routingTypes";
import makeFetch from "../../utils/makeFetch";
import { type MenuItem } from "../types/menuTypes";

export const menuStore = atom<MenuResponse[]>([]);
export const footerMenuStore = atom<MenuResponse[]>([]);
export const currentPaths = atom<MenuItem[]>([]);
export const activeNavItem = atom<string | null>(null);
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

export const getFooterMenu = async () => {
  if (footerMenuStore.get().length === 0) {
    console.log("no footerMenu store, setting...");
    const menus = await useMenuStore();
    let footerItems = menus.filter((menu) => {
      if (menu.handle?.includes(`-footer-`)) return menu;
    });
    footerMenuStore.set(footerItems as MenuResponse[]);
  }
  return footerMenuStore.get();
};

export const getFooterMenuStoreByLanguage = async (
  locale: string,
  isElection: boolean
) => {
  const footerDataStore = await getFooterMenu();
  const handle = `${
    isElection ? "wahlen-footer-" + locale : "chch-footer-" + locale
  }`;
  const footerData = footerDataStore.find((menu) => menu.handle === handle);
  return footerData;
};

export const indexMenuByLanguages = async (
  locale: string
): Promise<MenuResponse | null> => {
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

export const electionMenuByLanguages = async (
  locale: string
): Promise<MenuResponse | null> => {
  const menus = await useMenuStore();
  let menuForLanguage: MenuResponse | null = null;
  menus.forEach((menu) => {
    if (menu.label === "wahlen-" + locale) {
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

export const getMainMenuItems = async (
  locale: string,
  startItemId?: string,
  isElection?: boolean
) => {
  const navLinkItems: MenuItem[] = [];
  let menuData = null;
  if (isElection) {
    menuData = await electionMenuByLanguages(locale);
  } else {
    menuData = await indexMenuByLanguages(locale);
  }

  if (menuData) {
    let nodesToProcess = menuData.nodes;

    if (startItemId) {
      // Find the start item by ID if provided
      const startItem = findItemById(menuData.nodes, startItemId);
      if (startItem) {
        nodesToProcess = startItem.nodes;
      } else {
        return navLinkItems;
      }
    }

    nodesToProcess.forEach((entry) => {
      let item: MenuItem = createMenuItems(entry);
      navLinkItems.push(item);
    });
  }

  return navLinkItems;
};

const findItemById = (nodes: MenuNode[], id: string): MenuNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.nodes) {
      const found = findItemById(node.nodes, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

const createMenuItems = (
  entry: MenuNode,
  parentId: string | undefined = undefined
) => {

  let item: MenuItem = {
    id: entry.id,
    label: entry.label,
    type: entry.type,
    target: entry.target,
    documentId: entry.documentId,
    parentId: parentId,
    children: entry.nodes
      ? entry.nodes.map((child) => createMenuItems(child, entry.label))
      : [],
  };
  return item;
};
