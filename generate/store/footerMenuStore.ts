import { atom } from "nanostores";
import type { MenuResponse } from "../types/routingTypes";
import { useMenuStore } from "./menuStore";

export const footerMenuStore = atom<MenuResponse[]>([]);

export const useFooterMenuStore = async (locale: string) => {
  if (footerMenuStore.get().length === 0) {
    console.log("no footerMenu store, setting...");
    const menus = await useMenuStore();
    const router = useRouter().getRoutes();
    let footerItems = menus.filter((menu) => {
      if (menu.handle?.includes(`chch-footer-${locale}`)) return menu;
    });
    footerItems[0].nodes = footerItems[0].nodes.map((node) => {
      const route = router.find((route) => route.meta.id === node.documentId);
      if (route) {
        node.url = route.path;
      } else {
        node.url = "";
      }
      return node;
    });

    footerMenuStore.set(footerItems as MenuResponse[]);
  } else {
    console.log("footerMenu store already exists");
  }
  return footerMenuStore.get();
};
