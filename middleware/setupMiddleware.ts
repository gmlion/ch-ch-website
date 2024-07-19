import { useFooterMenuStore } from "~/generate/store/footerMenuStore";
import { useMenuStore } from "~/generate/store/menuStore";
import { usePublicationStore } from "~/generate/store/publicationStore";

export default defineNuxtRouteMiddleware(async (to) => {
  await useMenuStore();
  await usePublicationStore();
  await useFooterMenuStore();
  return;
});
