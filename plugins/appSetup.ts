import type { NuxtPayload } from "#app";
import { useFooterMenuStore } from "~/generate/store/footerMenuStore";
import { useMenuStore } from "~/generate/store/menuStore";
import { usePublicationStore } from "~/generate/store/publicationStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  await useMenuStore();
  await usePublicationStore();
  await useFooterMenuStore();
});
