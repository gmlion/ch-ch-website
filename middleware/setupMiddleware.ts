import appSetup from "~/plugins/appSetup";

export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();
  appSetup(nuxtApp);
  return;
});
