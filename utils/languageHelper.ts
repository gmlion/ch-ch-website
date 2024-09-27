import { useRouter } from "#app";

interface LanguageUrlMap {
  de: string | undefined;
  en: string | undefined;
  fr: string | undefined;
  rm: string | undefined;
  it: string | undefined;
}

interface GroupId {
  id: string;
  language: string;
}

interface RouteRecordNormalized {
  path: string;
  meta: {
    groupId?: GroupId;
  };
}

let languageUrlMap: LanguageUrlMap = {
  de: undefined,
  en: undefined,
  it: undefined,
  fr: undefined,
  rm: undefined,
};

export const languageHelper = (pageId: string | undefined) => {
  if (pageId) {
    const router = useRouter();
    const allRoutes = router.getRoutes() as RouteRecordNormalized[];

    // Filter routes with matching groupId.id
    const matchingRoutes = allRoutes.filter(
      (route) => route.meta.groupId && route.meta.groupId.id === pageId
    );

    // Organize routes by language
    const routesByLanguage = matchingRoutes.reduce(
      (acc: { [key: string]: string }, route) => {
        const groupId = route.meta.groupId;
        if (groupId && groupId.language) {
          const language = groupId.language;
          if (["de", "en", "it", "fr", "rm"].includes(language)) {
            acc[language] = route.path;
          }
        }
        return acc;
      },
      {}
    );

    languageUrlMap = {
      de: routesByLanguage.de,
      en: routesByLanguage.en,
      it: routesByLanguage.it,
      fr: routesByLanguage.fr,
      rm: routesByLanguage.rm,
    };
  }

  return languageUrlMap;
};
