import type {PublicationContainerComponent} from "~/core/types/publications";
import type {BodyComponent, CollapsibleContent, RichtextContent, YoutubeContent} from "~/core/types/contentComponents";
import {handleRichtext} from "~/utils/richtext"
import {getPublicationById} from "~/generate/store/publicationStore";
import {slugify} from "~/utils/slugifyAnchorElements";
import {handleYoutube} from "~/utils/youtube";

export const createFAQCollapsibleArray = async (content: PublicationContainerComponent[]): Promise<CollapsibleContent[]> => {
    let collapsibleItems: CollapsibleContent[] = [];
    for (const contentItem of content) {
        let collapsibleItem: CollapsibleContent = {
            id: "",
            title: "",
            content: {content: ""},
            slug: ""
        }
        const publication = await getPublicationById(contentItem.content.faq.params.teaser.reference.id)
        collapsibleItem = {
            id: publication?.systemdata.documentId.toString() || "",
            title: publication?.metadata.title || "",
            content: {content: collapsibleContentHandler(publication?.content[0].containers.body!) || ""},
            slug: slugify(publication?.metadata.title!)
        }

        collapsibleItems.push(collapsibleItem);
    }

    return collapsibleItems;
}

export const createAccordionCollapsibleArray = (content: PublicationContainerComponent[]): CollapsibleContent[] => {
    let collapsibleItems: CollapsibleContent[] = [];

    content.forEach(collapsibleItem => {
        let collapsibleItemModel: CollapsibleContent
        collapsibleItemModel = {
            id: collapsibleItem.id,
            title: collapsibleItem.content.title || "",
            content: {content: collapsibleContentHandler(collapsibleItem.containers.body)},
            slug: slugify(collapsibleItem.content.title || "")
        }

        collapsibleItems.push(collapsibleItemModel);
    })
    return collapsibleItems;
}

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