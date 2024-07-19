import { atom } from "nanostores";
import type { MenuResponse } from "../types/routing";
import { getFooterMenus } from "../../utils/url";
import { useMenuStore } from "./menuStore";
import { usePublicationStore } from "./publicationStore";
export const footerMenuStore = atom<MenuResponse[]>([]);

export const useFooterMenuStore = async () => {
  const menus = await useMenuStore();
  const publications = await usePublicationStore();
  if (footerMenuStore.get().length === 0) {
    console.log("no footerMenu store, setting...");
    const footerMenus = getFooterMenus(menus, publications);
    footerMenuStore.set(footerMenus as MenuResponse[]);
  } else {
    console.log("footerMenu store already exists");
  }
  return footerMenuStore.get();
};
