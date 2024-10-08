// @ts-nocheck
// TODO: Fix the types
import { getPublicationById } from "~/generate/store/publicationStore";
import { contentComponents } from "~/utils/contentComponentsHandler";

export const processHowToData = async (id: string) => {
  const publication = await getPublicationById(id);
  if (!publication) {
    console.error("Failed to fetch publication for id:", id);
    return;
  }
  const extractedSteps = await extractSteps(
    publication.content[0].containers.steps
  );
  const contentComponentsFromExtractedSteps = await Promise.all(
    extractedSteps.map(async (step) => await contentComponents(step, "de"))
  );

// Sort content components: if there is an image element, place the titleLead component under it
contentComponentsFromExtractedSteps.forEach((contentComponent) => {
  const imageIndex = contentComponent.findIndex(
    (component) => component.type === "image"
  );
  const titleLeadIndex = contentComponent.findIndex(
    (component) => component.type === "titleLead"
  );

  if (imageIndex !== -1 && titleLeadIndex !== -1) {
    const titleLeadComponent = contentComponent.splice(titleLeadIndex, 1)[0];
    contentComponent.splice(imageIndex + 1, 0, titleLeadComponent);
  }
});
  return contentComponentsFromExtractedSteps;
};

async function extractSteps(data) {
  const extractedSteps = data.map((item) => item.containers.step);
  return extractedSteps;
}
