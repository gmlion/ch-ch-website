import { atom } from "nanostores";
import { type MenuResponse } from "../types/routing";
import makeFetch from "../../utils/makeFetch";

export const menuStore = atom<MenuResponse[]>([]);

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
