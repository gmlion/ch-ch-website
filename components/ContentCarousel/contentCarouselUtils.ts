import {getPublicationById} from "~/generate/store/publicationStore";

export const processCarouselData = async (id: string) => {
    const publication = await getPublicationById(id);
    if (!publication) {
        console.error('Failed to fetch publication for id:', id);
        return;
    }
    return publication.content[0].containers.body[0].containers.gallery
}