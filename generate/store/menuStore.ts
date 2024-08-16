import { atom } from "nanostores";
import { type MenuNode, type MenuResponse } from "../types/routing";
import makeFetch from "../../utils/makeFetch";
import { type Breadcrumb, type MenuItem } from "../types/menu";

export const menuStore = atom<MenuResponse[]>([]);
export const currentPaths = atom<MenuItem[]>([]);
export const indexMenuStore = atom<MenuResponse | null>(null);
export const menuPush = atom<MenuResponse | null>(null);
export const homeMenuItems = atom<MenuItem[] | null>(null);
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

export const indexMenuByLanguages = async (
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

export const getMainMenuItems = async (
  locale: string,
  startItemId?: string
) => {
  const navLinkItems: MenuItem[] = [];
  const menuData = await indexMenuByLanguages(locale);

  if (menuData) {
    let nodesToProcess = menuData.nodes;

    if (startItemId) {
      // Find the start item by ID if provided
      const startItem = findItemById(menuData.nodes, startItemId);
      if (startItem) {
        nodesToProcess = startItem.nodes;
      } else {
        // If start item is not found, return an empty list
        return navLinkItems;
      }
    }

    // Process the nodes
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
  parentUrl: string | undefined = undefined,
  parentId: string | undefined = undefined
) => {
  let item: MenuItem = {
    id: entry.id,
    label: entry.label,
    type: entry.type,
    target: entry.target,
    parentId: parentId,
    parentUrl: parentUrl ? makeSlug(parentUrl) : undefined,
    route: `${parentUrl ? makeSlug(parentUrl) + "/" : ""}${makeSlug(
      entry.label
    )}`,
    children: entry.nodes
      ? entry.nodes.map((child) =>
          createMenuItems(child, entry.label, entry.id)
        )
      : [],
  };
  return item;
};

export const getBreadcrumb = async (
  currentPathId: string,
  locale: string,
  levels: number = 2
): Promise<Breadcrumb[]> => {
  const breadcrumbs: Breadcrumb[] = [];
  const menu = await getMainMenuItems(locale);

  const findNodeAndParents = (
    nodes: MenuItem[],
    id: string,
    level: number
  ): MenuItem[] | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return [node]; // Start building the breadcrumb trail
      }
      if (node.children && node.children.length > 0) {
        const result = findNodeAndParents(node.children, id, level);
        if (result) {
          return [node, ...result]; // Append the current node to the trail
        }
      }
    }
    return null;
  };

  const pathToNode = findNodeAndParents(menu, currentPathId, levels);
  if (!pathToNode) {
    return breadcrumbs;
  }

  // Get the x levels above
  const startLevel = Math.max(pathToNode.length - levels - 1, 0);
  const nodesAbove = pathToNode.slice(startLevel);

  // Convert nodes to breadcrumb format
  nodesAbove.forEach((node) => {
    breadcrumbs.push({
      id: node.id,
      label: node.label,
      route: node.route || "",
    });
  });

  return breadcrumbs;
};
