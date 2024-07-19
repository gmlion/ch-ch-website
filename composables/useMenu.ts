import type { NuxtPayload } from "#app";
import { useMenuStore } from "~/generate/store/menuStore";

export async function useMenu() {
  const nuxtApp = useNuxtApp();
  const menus = await useMenuStore();

  if (nuxtApp.ssrContext) {
    // Assuming you need to transform menus to match Partial<NuxtPayload>
    const payload: Partial<NuxtPayload> = { menus }; // Adjust this line as needed
    nuxtApp.ssrContext.payload = payload;

    return payload.menus as typeof menus;
  }
}
