import { atom } from "nanostores";
import { type MenuResponse } from "../types/routing";
import makeFetch from "../../utils/makeFetch";
import { type IndexMenu } from "../types/menu";
import { setIndexPublication } from "./publicationStore";

export const menuStore = atom<MenuResponse[]>([]);
export const indexMenuStore = atom<MenuResponse | null>(null);

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
  if (indexMenuStore.get() !== null) {
    console.log("indexMenuStore already exists");
    return indexMenuStore.get();
  }
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

  indexMenuStore.set(menuForLanguage);
  return indexMenuStore.get();
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
