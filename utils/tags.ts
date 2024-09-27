import {getKeyedPublications} from "~/generate/store/publicationStore";

export const getTitleByTag = async (documentId: string) => {
    const keyedPublications = await getKeyedPublications();

    if (!keyedPublications) {
        return null;
    }
    return keyedPublications[documentId].metadata;
};