import type {PublicationContainerComponent} from "~/core/types/publications";
import {createCollapsibleArray} from "~/components/Collapsible/utils/collapsibleUtils";
import type {ContentComponent} from "~/core/types/contentComponents";
import {randomUUID} from "uncrypto";
import {handleInfoBox} from "~/components/InfoBox/utils/infoBoxUtils";

export const contentComponents = async (content: PublicationContainerComponent[]): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = []
    const accordionItems: PublicationContainerComponent[] = []
    let contentComponents: ContentComponent[] = []
    for (const contentItem of content) {
        switch (contentItem.component) {
            case "faq-teaser": {
                faqItems.push(contentItem);
                break;
            } case "infobox": {
                contentComponents.push(handleInfoBox(contentItem))
                break;
            } case "accordion": {
                accordionItems.push(contentItem);
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
    if (accordionItems.length > 0) {
        console.log(accordionItems)
        contentComponents.push({
            id: randomUUID(),
            type: "faq-teaser",
            content: await createCollapsibleArray(accordionItems)
        })
    }
    return contentComponents;
}