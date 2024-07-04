export const getIsoCodeFromLocale = (locale: string | undefined): string => {
  return locale?.includes("-") ? locale.split("-")[0] : locale ?? "";
};

export const i18nLocales = [
  {
    code: "de",
    name: "German",
    file: "de.json",
    cms: "de-CH",
  },
  {
    code: "fr",
    name: "French",
    file: "fr.json",
    cms: "fr-CH",
  },
  {
    code: "it",
    name: "Italian",
    file: "it.json",
    cms: "it-CH",
  },
  {
    code: "rm",
    name: "Romansh",
    file: "rm.json",
    cms: "rm-CH",
  },
  {
    code: "en",
    name: "English",
    file: "en.json",
    cms: "en",
  },
];
