import { makeKeyedPublications } from "~/generate/store/publicationStore";
import { useI18n } from "vue-i18n";

export const getTitleByTag = async (documentId: string) => {
  const keyedPublications = await makeKeyedPublications();

  if (!keyedPublications) {
    return null;
  }
  return keyedPublications[documentId].metadata;
};