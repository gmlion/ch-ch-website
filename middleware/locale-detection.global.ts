export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();
  const locale = to.path.split('/')[1];
  const availableLocales = ['en', 'de', 'fr', 'it', 'rm'];

  if (availableLocales.includes(locale)) {
    nuxtApp.$i18n?.setLocale(locale);
  }
});
