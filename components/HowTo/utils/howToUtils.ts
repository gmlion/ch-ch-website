// @ts-nocheck
// TODO: Fix the types
import { getPublicationById } from "~/generate/store/publicationStore";
import { contentComponents } from "~/utils/contentComponentsHandler";

export const processHowToData = async (id: string, locale: string) => {
    const publication = await getPublicationById(id);
    if (!publication) {
        console.error("Failed to fetch publication for id:", id);
        return;
    }
    const extractedSteps = await extractSteps(
        publication.content[0].containers.steps
    );
    const contentComponentsFromExtractedSteps = await Promise.all(
        extractedSteps.map(async (step) => await contentComponents(step, locale))
    );

    contentComponentsFromExtractedSteps.forEach((contentComponent) => {
        const imageIndex = contentComponent.findIndex(
            (component) => component.type === "image"
        );
        const titleIndex = contentComponent.findIndex(
            (component) => component.type === "title"
        );

        if (imageIndex !== -1 && titleIndex !== -1) {
            const titleComponent = contentComponent.splice(titleIndex, 1)[0];
            contentComponent.splice(imageIndex + 1, 0, titleComponent);
        }
    });
    return contentComponentsFromExtractedSteps;
};

async function extractSteps(data) {
    const extractedSteps = data.map((item) => item.containers.step);
    return extractedSteps;
}
