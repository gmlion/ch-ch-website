import {getPublicationById} from "~/generate/store/publicationStore";

export const processHowToData = async (id: string) => {
    const publication = await getPublicationById(id);
    if (!publication) {
        console.error('Failed to fetch publication for id:', id);
        return;
    }
    return extractSteps(publication.content[0].containers.steps)
}

async function extractSteps(data) {
    const extractedSteps = data.map(item => (item.containers.step));
    return extractedSteps;
}