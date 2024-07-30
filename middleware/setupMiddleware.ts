// import { useMenuStore } from "~/generate/store/menuStore";
// import { usePublicationStore } from "~/generate/store/publicationStore";

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    // await useMenuStore();
    // await usePublicationStore();

    return;
  } catch (error) {
    console.error("Middleware error:", error);
  }
});
