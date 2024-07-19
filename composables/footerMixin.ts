import type { LinkItem } from "~/store/types/page";
import { footerLinks } from "../store/pageState";
import {
  footerMenuStore,
  useFooterMenuStore,
} from "~/generate/store/footerMenuStore";
export const footerMixin = (locale: string) => {
  let footerLinkItems: readonly LinkItem[] = [];

  const footerMenus = footerMenuStore.get();

  console.log("soldier boy", footerMenus.length);

  const currentMenu = () => {
    if (footerMenus.length < 1) {
      return;
    }

    return footerLinkItems.find((menu) => {
      //   console.log(menu);
    });
  };

  return footerLinkItems.find((menu) => {
    // console.log(menu);
  });
};
