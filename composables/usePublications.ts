import type { NuxtPayload } from "#app";
import { usePublicationStore } from "~/generate/store/publicationStore";

export async function usePublication() {
  const nuxtApp = useNuxtApp();
  const publications = await usePublicationStore();

  if (nuxtApp.ssrContext) {
    const payload: Partial<NuxtPayload> = { publications };
    nuxtApp.ssrContext.payload = payload;

    return payload.publications as typeof publications;
  }
}
