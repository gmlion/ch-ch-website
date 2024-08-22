import type {PublicationContainerComponent} from "~/core/types/publications";
import {createCollapsibleArray} from "~/components/Collapsible/utils/utils";
import type {ContentComponent} from "~/core/types/contentComponents";
import {randomUUID} from "uncrypto";

export const contentComponents = async (content: PublicationContainerComponent[]): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = []
    let contentComponents: ContentComponent[] = []
    for (const contentItem of content) {
        switch (contentItem.component) {
            case "faq-teaser": {
                faqItems.push(contentItem);
                break;
            }
        }
    }
    if (faqItems.length > 0) {
        contentComponents.push({
            id: randomUUID(),
            type: "faq-teaser",
            content: await createCollapsibleArray(faqItems)
        })
    }
    return contentComponents;
}