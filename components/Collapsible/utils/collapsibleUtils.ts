import type {PublicationContainerComponent} from "~/core/types/publications";
import type {CollapsibleContent} from "~/core/types/contentComponents";
import {handleRichtext} from "~/utils/richtext"
import {getPublicationById} from "~/generate/store/publicationStore";
import {slugify} from "~/utils/slugifyAnchorElements";

export const createCollapsibleArray = async (content: PublicationContainerComponent[]): Promise<CollapsibleContent[]> => {
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
            content: { content: handleRichtext(publication?.content[0].containers.body[0]!) || "" },
            slug: slugify(publication?.metadata.title!)
        }

        collapsibleItems.push(collapsibleItem);
    }

    return collapsibleItems;
}