import type { Publication } from "~/core/types/publicationsTypes";
import { getPublicationById } from "~/generate/store/publicationStore";

export const checkCantonLink = async (text: string): Promise<Publication | undefined> => {
    const regex = /data-li-document-ref="(\d+)"/g;
    const matches = text.matchAll(regex);

    if (matches) {
        for (const match of matches) {
            const regexId = match[1];
            if (regexId) {
                const publication = await getPublicationById(regexId)
                if (publication?.systemdata.contentType === "cantonal-service")
                return publication
            }
        }
    }

    return undefined;
}
