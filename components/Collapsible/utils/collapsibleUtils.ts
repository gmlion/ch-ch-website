import type {FAQ, PublicationContainerComponent} from "~/core/types/publicationsTypes";
import type { BodyComponent, CollapsibleContent, RichtextContent, YoutubeContent } from "~/core/types/contentComponentsTypes";
import { handleRichtext } from "~/utils/richtext";
import { getPublicationById } from "~/generate/store/publicationStore";
import { slugify } from "~/utils/slugifyAnchorElements";
import { handleYoutube } from "~/utils/youtube";
import type {Image} from "~/components/HomeCarousel/types/types";

function isYoutubeContent(content: any): content is YoutubeContent {
    return (content as YoutubeContent).youtubeInclude !== undefined;
}

function isRichtextContent(content: any): content is { title?: string; text?: string; question: string; faq?: FAQ; richtext?: string[]; image?: Image } {
    return (content as { question: string }).question !== undefined;
}

export const createFAQCollapsibleArray = async (content: PublicationContainerComponent[]): Promise<CollapsibleContent[]> => {
    let collapsibleItems: CollapsibleContent[] = [];
    for (const contentItem of content) {
        let collapsibleItem: CollapsibleContent = {
            id: "",
            title: "",
            content: { content: "" },
            slug: ""
        };
        if (!contentItem.content || isYoutubeContent(contentItem.content)) {
            continue;
        }
        const publication = await getPublicationById(contentItem.content.faq?.params.teaser.reference.id || "");
        if (!publication) {
            console.error('Failed to fetch publication for id:', contentItem.content.faq?.params.teaser.reference.id);
            continue;
        }
        if (isRichtextContent(publication.content[0].content)) {

            collapsibleItem = {
                id: publication.systemdata.documentId.toString() || "",
                title: publication.metadata.title || publication.content[0].content.question,
                content: { content: collapsibleContentHandler(publication.content[0].containers.body) || "" },
                slug: publication.metadata.title ? slugify(publication.metadata.title) : slugify(publication.content[0].content.question)
            };
        }

        collapsibleItems.push(collapsibleItem);
    }

    return collapsibleItems;
};

export const createAccordionCollapsibleArray = (content: PublicationContainerComponent[]): CollapsibleContent[] => {
    let collapsibleItems: CollapsibleContent[] = [];
    content.forEach(collapsibleItem => {
        if (!collapsibleItem.content || isYoutubeContent(collapsibleItem.content)) {
            return;
        }
        let collapsibleItemModel: CollapsibleContent = {
            id: collapsibleItem.id,
            title: collapsibleItem.content.title || "",
            content: { content: collapsibleContentHandler(collapsibleItem.containers.body) },
            slug: slugify(collapsibleItem.content.title || "")
        };

        collapsibleItems.push(collapsibleItemModel);
    });
    return collapsibleItems;
};

const collapsibleContentHandler = (bodyComponent: BodyComponent<RichtextContent | YoutubeContent>[]): string => {
    let result = "";
    bodyComponent.forEach(item => {
        if (item.component === "youtube") {
            result += handleYoutube([item as BodyComponent<YoutubeContent>]);
        }

        if (item.component === "p" || item.component === "subtitle") {
            result += handleRichtext([item as BodyComponent<RichtextContent>]);
        }
    });
    return result;
};