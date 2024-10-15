import type { PublicationContainerComponent } from "~/core/types/publicationsTypes";
import type { CollapsibleContent, YoutubeContent } from "~/core/types/contentComponentsTypes";
import { getPublicationById } from "~/generate/store/publicationStore";
import { slugify } from "~/utils/slugifyAnchorElements";
import { contentComponents } from "~/utils/contentComponentsHandler";

function isYoutubeContent(content: any): content is YoutubeContent {
    return (content as YoutubeContent).youtubeInclude !== undefined;
}

export const createFAQCollapsibleArray = async (content: PublicationContainerComponent[], locale: string): Promise<CollapsibleContent[]> => {
    let collapsibleItems: CollapsibleContent[] = [];
    for (const contentItem of content) {
        let collapsibleItem: CollapsibleContent = {
            id: "",
            title: "",
            content: [],
            slug: ""
        };

        if (!contentItem.content || isYoutubeContent(contentItem.content)) {
            continue;
        }

        const publication = await getPublicationById(contentItem.content.faq?.params?.teaser?.reference?.id || "");
        if (!publication) {
            console.error('Failed to fetch publication for id:', contentItem.content.faq?.params?.teaser?.reference?.id);
            continue;
        }
        collapsibleItem = {
            id: publication.systemdata.documentId.toString() || "",
            title: publication.metadata.title || (publication.content[0]?.content as {
                question: string
            })?.question || "",
            content: Array.isArray(publication.content[0]?.containers?.right)
                ? await contentComponents(publication.content[0].containers.right, locale)
                : await contentComponents(publication.content[0].containers.body, locale) || [],
            slug: publication.metadata.title
                ? slugify(publication.metadata.title)
                : slugify((publication.content[0]?.content as { question: string })?.question || "")
        };

        collapsibleItems.push(collapsibleItem);
    }

    return collapsibleItems;
};

export const createAccordionCollapsibleArray = async (content: PublicationContainerComponent[], culture: string): Promise<CollapsibleContent[]> => {
    let collapsibleItems: CollapsibleContent[] = [];
    try {
        for (const collapsibleItem of content) {
            if (collapsibleItem.containers?.body) {
                try {
                    const contentArray = collapsibleItem.containers.body;

                    if (Array.isArray(contentArray)) {
                        let collapsibleItemModel: CollapsibleContent = {
                            id: collapsibleItem.id,
                            title: (collapsibleItem.content as { title: string })?.title || "",
                            content: await contentComponents(contentArray as PublicationContainerComponent[], culture, true),
                            slug: slugify((collapsibleItem.content as { title: string })?.title || "")
                        };

                        collapsibleItems.push(collapsibleItemModel);
                    } else {
                        console.error("Expected an array for containers.body, but got:", contentArray);
                    }
                } catch (err) {
                    console.error("Error processing collapsible item content:", err);
                }
            }
        }
    } catch (err) {
        console.error("Error occurred during processing:", err);
    }

    return collapsibleItems;
};
