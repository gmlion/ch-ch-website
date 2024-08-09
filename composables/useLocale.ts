import { useI18n } from "vue-i18n";

export function useLocale() {
  const i18n = useI18n();

  const setLocale = (locale: string) => {
    i18n.locale.value = locale;
  };

  return { setLocale };
}
