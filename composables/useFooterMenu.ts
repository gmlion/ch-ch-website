import type { NuxtPayload } from "#app";
import { useFooterMenuStore } from "../generate/store/footerMenuStore";

export async function useFooterMenu() {
  const nuxtApp = useNuxtApp();
  const footerMenu = await useFooterMenuStore();

  if (nuxtApp.ssrContext) {
    const payload: Partial<NuxtPayload> = { footerMenu };
    nuxtApp.ssrContext.payload = payload;

    return payload.footerMenu as typeof footerMenu;
  }
}
